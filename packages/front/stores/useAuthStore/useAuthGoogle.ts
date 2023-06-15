import { tools } from "@tools";
import { $auth, AuthStore } from ".";
import { $loading } from "@stores";

export function useAuthGoogle(): AuthStore {
  function requestCode() {
    const config = useRuntimeConfig();
    const client = google.accounts.oauth2.initCodeClient({
      client_id: config.public.vendor.google.clientId,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        // "https://www.googleapis.com/auth/youtube.readonly",
        // "https://www.googleapis.com/auth/youtubepartner-channel-audit",
      ].join(" "),
      ux_mode: "redirect",
      redirect_uri: config.public.url.clientBase + "/login/google/",
      state: tools.random.string(),
    });
    client.requestCode();
  }

  function start() {
    useHead({
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
          async: false,
          defer: false,
        },
      ],
    });
    $loading().show();
    const interval = setInterval(() => {
      if (typeof google !== "undefined") {
        clearInterval(interval);
        requestCode();
        $loading().hide();
      }
    }, 500);
  }

  async function fetchSocialToken() {
    try {
      const route = useRoute();
      const router = useRouter();
      const config = useRuntimeConfig();
      const response = await axios("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          code: route.query.code,
          client_id: config.public.vendor.google.clientId,
          client_secret: config.public.vendor.google.clientSecret,
          redirect_uri: config.public.url.clientBase + route.path,
          grant_type: "authorization_code",
        },
      });
      router.replace({ query: {} });
      const { access_token: socialAccessToken } = response.data;
      return {
        socialAccessToken,
      };
    } catch {
      return null;
    }
  }

  async function refreshSocialToken() {
    try {
      const config = useRuntimeConfig();
      const refreshToken = $auth().token.socialRefreshToken;
      const response = await axios("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          client_id: config.public.vendor.google.clientId,
          client_secret: config.public.vendor.google.clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        },
      });
      const { access_token: socialAccessToken } = response.data;
      return {
        socialAccessToken,
      };
    } catch {
      return null;
    }
  }

  async function fetchUser(socialAccessToken: string) {
    try {
      if (!socialAccessToken) {
        return null;
      }
      const response = await axios(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            access_token: socialAccessToken,
          },
        }
      );
      const { email: userName, name, email, picture: avatar } = response.data;
      return { userName, name, email, avatar };
    } catch {
      return null;
    }
  }

  return {
    start,
    fetchSocialToken,
    refreshSocialToken,
    fetchUser,
  };
}
