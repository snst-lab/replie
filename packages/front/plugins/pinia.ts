import { Pinia, PiniaPluginContext, StateTree } from "pinia";
import cookie from "js-cookie";
import { NuxtApp } from "nuxt/app";
import { $auth } from "@stores";

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions;
  }
}

type PersistOptions =
  | {
      enabled: boolean | string[];
      lifetime?: "session" | "long" | "max" | "permanent" | number;
      scope?: "global" | "page" | "subpages" | string;
      exclude?: string[];
    }
  | boolean;

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  (nuxtApp.$pinia as Pinia).use((context: PiniaPluginContext) => {
    const {
      options: { persist },
      store,
    } = context;
    const route = useRoute();
    const isEnabled = persist === true || (persist && persist.enabled);

    const postfix =
      store.$id !== "auth" && $auth().user.id ? $auth().user.id : "cache";
    const storeKey = store.$id + "-" + postfix;

    store.$patch(
      (() => {
        try {
          if (!isEnabled) {
            localStorage.removeItem(storeKey);
            cookie.remove(storeKey);
            throw null;
          }
          const cookieSavedPath = cookie.get(storeKey);
          const storageValue = localStorage.getItem(storeKey);
          const storageValuePermanent = localStorage.getItem(
            storeKey + "@permanent"
          );
          if (storageValuePermanent) {
            return restoreStorageValue(storageValuePermanent, cookieSavedPath);
          }
          if (storageValue != null && cookieSavedPath) {
            return restoreStorageValue(storageValue, cookieSavedPath);
          }
          if (storageValue != null && !cookieSavedPath) {
            localStorage.removeItem(storeKey);
            throw null;
          }
          if (storageValue == null && cookieSavedPath) {
            cookie.remove(storeKey);
            throw null;
          }
        } catch (e) {
          return null;
        }
      })()
    );

    function restoreStorageValue(storageValue: any, cookieSavedPath?: string) {
      if (
        persist &&
        persist !== true &&
        persist.scope &&
        typeof persist.scope === "string"
      ) {
        switch (persist.scope) {
          case "global":
            return JSON.parse(storageValue);
          case "page":
            if (route.path === cookieSavedPath) {
              return JSON.parse(storageValue);
            }
            return null;
          case "subpages":
            if (route.path.startsWith(cookieSavedPath ?? "")) {
              return JSON.parse(storageValue);
            }
            return null;
          default:
            if (route.path.startsWith(persist.scope)) {
              return JSON.parse(storageValue);
            }
            return null;
        }
      }
      return JSON.parse(storageValue);
    }

    store.$onAction(
      ({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, // hook if the action throws or rejects
      }) => {
        after(() => {
          try {
            if (!isEnabled) {
              throw null;
            }

            if (persist === true) {
              cookie.set(storeKey, route.path, {
                sameSite: "strict",
                secure: true,
              });
              localStorage.setItem(
                storeKey,
                JSON.stringify(store.$state as StateTree)
              );
              return;
            }
            if (typeof persist.lifetime === "number") {
              cookie.set(storeKey, route.path, {
                expires: persist.lifetime,
                sameSite: "strict",
                secure: true,
              });
              localStorage.setItem(
                storeKey,
                JSON.stringify(
                  store.$state as StateTree,
                  Array.isArray(persist.enabled) ? persist.enabled : undefined
                )
              );
              return;
            }
            if (typeof persist.lifetime === "string") {
              switch (persist.lifetime) {
                case "permanent":
                  localStorage.setItem(
                    storeKey + "@permanent",
                    JSON.stringify(
                      store.$state as StateTree,
                      Array.isArray(persist.enabled)
                        ? persist.enabled
                        : undefined
                    )
                  );
                  return;
                case "max":
                  cookie.set(storeKey, route.path, {
                    expires: 400,
                    sameSite: "strict",
                    secure: true,
                  });
                  break;
                case "long":
                  cookie.set(storeKey, route.path, {
                    expires: 7,
                    sameSite: "strict",
                    secure: true,
                  });
                  break;
                case "session":
                  cookie.set(storeKey, route.path, {
                    sameSite: "strict",
                    secure: true,
                  });
                  break;
                default:
              }
              localStorage.setItem(
                storeKey,
                JSON.stringify(
                  store.$state as StateTree,
                  Array.isArray(persist.enabled) ? persist.enabled : undefined
                )
              );
              return;
            }
          } catch (e) {}
        });
      }
    );
  });
});
