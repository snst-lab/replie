export {};
declare global {
  namespace Auth {
    type Type = "" | "email" | "google" | "line" | "wallet";

    type Token = {
      accessToken: string | null;
      socialAccessToken: string | null;
      socialRefreshToken: string | null;
    };

    type User = {
      id: string;
      authType: string;
      userName: string;
      email: string;
      tel: string;
      avatar: string;
      lastName: string;
      firstName: string;
      zip1: string;
      zip2: string;
      address1: string;
      address2: string;
      address3: string;
      address4: string;
      status: string;
      licence: string;
      meta: JsonValue;
      lastLoginedAt: Date;
    };

    type Variables = {
      authType: string;
      userName: string;
      accessToken: string;
      socialAccessToken: string;
    };

    type GuardResponse = {
      user: Auth.User;
      jwt: {
        update: boolean;
        accessToken: string;
      };
    };
  }
}
