import { jsonToGraphQLQuery } from "json-to-graphql-query";
import { $auth, $dialog, $loading } from "@stores";
import { AxiosError, AxiosResponse } from "axios";

export async function useQuery(
  methodName: string,
  args?: Json | null,
  field?: string[] | null,
  variables?: Json | null
) {
  return main("query", methodName, args, field, variables);
}

export async function useMutation(
  methodName: string,
  args?: Json | null,
  field?: string[] | null,
  variables?: Json | null
) {
  return main("mutation", methodName, args, field, variables);
}

async function main(
  scheme: "query" | "mutation",
  methodName: string,
  args?: Json | null,
  field?: string[] | null,
  variables?: Json | null
) {
  args = args ?? {};
  field = field ?? ["response", "jwt"];
  variables = variables ?? {
    auth: {
      authType: $auth().user.authType,
      userName: $auth().user.userName,
      accessToken: $auth().token.accessToken,
      socialAccessToken: $auth().token.socialAccessToken,
    },
  };
  const config = useRuntimeConfig();
  const queryString = jsonToGraphQLQuery({
    [methodName]: {
      __args: args,
    },
  });
  axios.interceptors.request.clear();
  axios.interceptors.request.use((config) => {
    $loading().apiStart(methodName);
    return config;
  });
  axios.interceptors.response.clear();
  axios.interceptors.response.use(
    async (response: AxiosResponse) => {
      $loading().apiEnd(methodName);
      if (!$loading().isApiProcessing && response.data?.data) {
        $loading().hide(true);
      } else if (!$loading().isApiProcessing && !response.data?.data) {
        $loading().hide(false);
      }
      return response;
    },
    (error: AxiosError) => {
      $loading().apiEnd(methodName);
      if (!error?.response) {
        showDialog("disconected");
        return Promise.reject(error);
      }
      if (!$loading().isApiProcessing) {
        $loading().hide(false);
      }
      handleStatus(error.response.status);
      return Promise.reject(error);
    }
  );
  const response = await axios.post(config.public.url.graphQlBase, {
    query: `${scheme} {${queryString}{${field.join("\n")}}}`,
    variables,
  });
  return handleResponse(methodName, response);
}

function handleResponse(
  methodName: string,
  response: AxiosResponse<{
    data?: {
      [key: string]: Api.Response;
    };
    errors?: any[];
  }>
) {
  if (!response?.data) {
    showDialog("disconected");
  }
  const data = response.data.data?.[methodName];
  const error = response.data.errors?.[0];
  if (data) {
    if (data["jwt"]?.update && data["jwt"]?.accessToken) {
      info("update jwt");
      $auth().updateAccessToken(data["jwt"]?.accessToken ?? null);
    }
    return data["response"] ?? null;
  }
  if (error) {
    const extensions = error.extensions;
    if (!extensions && error.message) {
      showDialog("unknown");
      return Promise.reject(error);
    }
    if (extensions?.code) {
      showDialog(extensions.code);
      return Promise.reject(error);
    }
    if (extensions?.status) {
      handleStatus(extensions.status);
      return Promise.reject(error);
    }
  }
}

function handleStatus(code: number) {
  switch (code) {
    case 400:
      showDialog("bad-request");
      break;
    case 401:
      showDialog("authentication-failed");
      break;
    case 404:
      showDialog("not-found-url");
      break;
    case 500:
      showDialog("unknown");
      break;
    default:
      showDialog("unknown");
  }
}

function showDialog(code: Error.Code) {
  $dialog().hideAll();
  $loading().hide(false);
  const { public: constants } = useRuntimeConfig();
  $dialog().show("error", {
    message: constants.error[code as keyof typeof constants.error].message,
    onHide: () => {
      redirect(
        constants.error[code as keyof typeof constants.error].redirect,
        code
      );
    },
  });
}

function redirect(
  redirectTo: boolean | string | "#back" | "#error",
  code: Error.Code
) {
  const router = useRouter();
  switch (redirectTo) {
    case true:
      break;
    case false:
      break;
    case "#error":
      router.replace(`/error/?code=${code}`);
      break;
    case "#back":
      router.back();
      break;
    default:
      router.replace(redirectTo);
      break;
  }
}
