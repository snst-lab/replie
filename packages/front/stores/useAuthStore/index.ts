import { defineStore } from "pinia";
import { useAuthGoogle } from "./useAuthGoogle";
import { $notification } from "@stores";

export type AuthStore = {
  start: () => void;
  fetchSocialToken: () => Promise<Partial<Auth.Token> | null>;
  refreshSocialToken: () => Promise<Partial<Auth.Token> | null>;
  fetchUser: (accessToken: string) => Promise<Partial<Auth.User> | null>;
};

const store: Record<Auth.Type, AuthStore> = {
  "": {} as AuthStore,
  email: {} as AuthStore,
  google: useAuthGoogle(),
  line: {} as AuthStore,
  wallet: {} as AuthStore,
};

const useAuthStore = defineStore("auth", {
  state: () => ({
    token: {
      accessToken: null,
      socialAccessToken: null,
      socialRefreshToken: null,
    } as Auth.Token,
    user: {
      id: "",
      authType: "" as Auth.Type,
      userName: "",
      avatar: "",
      email: "",
      tel: "",
      name: "",
      lastName: "",
      firstName: "",
      zip1: "",
      zip2: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      licence: "",
      status: "",
      meta: {},
      lastLoginedAt: {} as Date,
    } as Auth.User,
    url: "/",
  }),
  persist: {
    enabled: true,
    lifetime: "long",
    scope: "global",
  },
  actions: {
    async checkLogin(): Promise<void> {
      try {
        if (!this.token?.accessToken) {
          throw new Error();
        }
      } catch {
        useRouter().replace("/login/");
      }
    },
    async start(type?: Auth.Type): Promise<void | null> {
      try {
        type = type ?? (this.user.authType as Auth.Type);
        if (!type) {
          throw new Error();
        }
        this.user.authType = type;
        await store[type].start();
      } catch {
        this.user.authType = "";
        return null;
      }
    },
    async fetchSocialToken(): Promise<Auth.Token | null> {
      if (!this.user.authType) {
        return null;
      }
      const token = await store[
        this.user.authType as Auth.Type
      ].fetchSocialToken();
      if (!token) {
        return null;
      }
      this.token.socialAccessToken = token.socialAccessToken ?? null;
      this.token.socialRefreshToken = token.socialRefreshToken ?? null;
      return this.token;
    },
    async refreshSocialToken(): Promise<Auth.Token | null> {
      if (!this.user.authType) {
        return null;
      }
      const token = await store[
        this.user.authType as Auth.Type
      ].refreshSocialToken();
      if (!token) {
        return null;
      }
      this.token.socialAccessToken = token.socialAccessToken ?? null;
      this.token.socialRefreshToken = token.socialRefreshToken ?? null;
      return this.token;
    },
    async fetchUser(): Promise<Auth.User | null> {
      if (!this.token.socialAccessToken) {
        return null;
      }
      const user = await store[this.user.authType as Auth.Type].fetchUser(
        this.token.socialAccessToken
      );
      if (!user) {
        return null;
      }
      return Object.assign(this.user, user);
    },
    async login(
      authType?: Auth.Type,
      userName?: string,
      secret?: string
    ): Promise<Auth.User | null> {
      const user = await useMutation("login", {
        authType: authType ?? this.user.authType,
        userName: userName ?? this.user.userName,
        secret: secret ?? this.token.socialAccessToken,
      });
      if (!user) {
        return null;
      }
      await $notification().setTooltip("ログインしました");
      return Object.assign(this.user, user);
    },
    async logout(): Promise<void | null> {
      try {
        await this.$reset();
        await $notification().showTooltip("ログアウトしました");
        navigateTo("/login/");
        // window.location.reload();
      } catch {
        return null;
      }
    },
    updateAccessToken(accessToken: string | null): void {
      if (accessToken) {
        this.token.accessToken = accessToken;
      }
    },
    saveUrl(url?: string) {
      url = url || window.location.href;
      this.url = url;
    },
    restoreUrl() {
      if (this.url) {
        window.location.href = this.url;
        this.url = "";
      } else {
        window.location.href = "/";
      }
    },
  },
});
export const $auth = () => useAuthStore();
