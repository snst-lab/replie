import { LoggerService } from "@nestjs/common";

const error = {
  unknown: {
    message: "エラーが発生しました。",
    status: 500,
    logLevel: "error",
    redirect: "#error",
  },
  disconected: {
    message: "通信に失敗しました。時間を置いて再試行してください。",
    status: 500,
    logLevel: false,
    redirect: "#error",
  },
  "server-timeout": {
    message:
      "サーバー側のプロセスがタイムアウトしました。時間を置いて再試行してください。",
    status: 504,
    logLevel: "error",
    redirect: "#error",
  },
  "authentication-failed": {
    message: "認証に失敗しました。再度ログインを試みてください。",
    status: 401,
    logLevel: false,
    redirect: "/login/",
  },
  "session-expired": {
    message:
      "セッションの有効期限が切れています。再度ログインを試みてください。",
    status: 401,
    logLevel: false,
    redirect: "/login/",
  },
  "session-create-error": {
    message: "セッションの生成に失敗しました。再度ログインを試みてください。",
    status: 401,
    logLevel: false,
    redirect: "/login/",
  },
  "not-found-url": {
    message: "リクエストされたURLが見つかりません。トップページへ戻ります。",
    status: 404,
    logLevel: false,
    redirect: "/",
  },
  "not-found-user": {
    message:
      "登録されたユーザーが見つかりません。再度ユーザー登録を試みてください。",
    status: 404,
    logLevel: false,
    redirect: "/login/",
  },
  "not-found-person": {
    message: "返信相手の情報が見つかりません。一覧へ戻ります。",
    status: 404,
    logLevel: false,
    redirect: "/persons/",
  },
  "not-found-cache": {
    message: "キャッシュが見つかりません。",
    status: 404,
    logLevel: false,
    redirect: false,
  },
  "not-found-issue": {
    message: "相談結果が見つかりません。一覧へ戻ります。",
    status: 404,
    logLevel: false,
    redirect: "/issues/",
  },
  "bad-request": {
    message: "不正なリクエストです。",
    status: 400,
    logLevel: false,
    redirect: false,
  },
  "invalid-parameter": {
    message: "リクエストの形式が不正です。",
    status: 400,
    logLevel: false,
    redirect: false,
  },
  "invalid-signature": {
    message: "署名の検証に失敗しました。",
    status: 400,
    logLevel: false,
    redirect: false,
  },
} satisfies Record<string, Error.Props>;

export default error;

declare global {
  namespace Error {
    export type Code = keyof typeof error;
    export type Props = {
      status: number;
      message: string;
      logLevel: false | keyof LoggerService;
      redirect: false | string | "#back" | "#error";
    };
  }
}
