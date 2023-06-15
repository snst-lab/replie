<script setup lang="ts">
import { $config, $dialog, $loading, $notification, $auth } from "@stores";
import { Screen } from "quasar";

const route = useRoute();
const router = useRouter();
const scss = useScssVars();

const isDrawerOpen = ref<boolean>(false);
const isDrawerMin = ref<boolean>(false);
const drawerBehavior = ref<"desktop" | "mobile">("desktop");
const name = ref<string>($auth().user.lastName + " " + $auth().user.firstName);

const drawerContents: {
  icon: string;
  label: string;
  sub?: boolean;
  action: () => void;
}[] = [
  {
    icon: "home",
    label: "トップ",
    action: () => {
      router.push("/");
      if (!Screen.gt.sm) {
        isDrawerOpen.value = false;
      }
    },
  },
  {
    icon: "person",
    label: "返信先リスト",
    action: () => {
      router.push("/persons/");
      if (!Screen.gt.sm) {
        isDrawerOpen.value = false;
      }
    },
  },
  {
    icon: "search",
    label: "相談結果一覧",
    action: () => {
      router.push("/issues/");
      if (!Screen.gt.sm) {
        isDrawerOpen.value = false;
      }
    },
  },
  {
    icon: "settings",
    label: "設定",
    action: () => {
      router.push("/config/");
      if (!Screen.gt.sm) {
        isDrawerOpen.value = false;
      }
    },
  },
  {
    icon: "login",
    label: "ログイン",
    action: () => {
      router.push("/login/");
      if (!Screen.gt.sm) {
        isDrawerOpen.value = false;
      }
    },
  },
  {
    icon: "logout",
    label: "ログアウト",
    action: () => {
      $dialog().show("confirm", {
        label: "ログアウトする",
        message: "ログアウトしますか？",
        action: () => {
          $auth().logout();
          if (!Screen.gt.sm) {
            isDrawerOpen.value = false;
          }
        },
      });
    },
  },
];

const onEvent = {
  clickHamburger() {
    if (Screen.gt.sm) {
      isDrawerOpen.value = true;
      isDrawerMin.value = !isDrawerMin.value;
    } else {
      isDrawerOpen.value = !isDrawerOpen.value;
    }
  },
  resize() {
    if (Screen.gt.sm) {
      drawerBehavior.value = "desktop";
    } else {
      isDrawerMin.value = false;
      drawerBehavior.value = "mobile";
    }
  },
  clickLogin() {
    $auth().saveUrl(route.path);
    $auth().start();
    if (!Screen.gt.sm) {
      isDrawerOpen.value = false;
    }
  },
  clickLogout() {
    $auth().logout();
  },
};
</script>

<template>
  <div class="l-dashboard">
    <q-resize-observer debounce="100" @resize="onEvent.resize" />
    <q-layout view="hHh Lpr fFf">
      <q-header>
        <q-toolbar class="justify-between items-center">
          <div class="flex no-wrap items-center">
            <q-btn flat @click="onEvent.clickHamburger" round icon="menu" />
            <NuxtLink to="/">
              <ImageLogo style="width: 120px" />
            </NuxtLink>
          </div>

          <ul class="flex no-wrap items-center q-gutter-x-sm q-pr-sm">
            <li @click="$config().toggle('darkMode')">
              <q-btn
                dense
                :text-color="$config().darkMode.value ? `grey-3` : `grey-7`"
                round
                unelevated
                flat
                :icon="$config().darkMode.value ? `light_mode` : `dark_mode`"
                class="q-ml-md"
              >
              </q-btn>
            </li>
            <li>
              <q-btn
                :text-color="$config().darkMode.value ? `grey-3` : `grey-7`"
                dense
                round
                unelevated
                icon="notifications_none"
                to="/notifications/"
              >
                <q-badge
                  color="pink"
                  rounded
                  floating
                  v-show="$notification().unreadCount > 0"
                  >{{ $notification().unreadCount }}</q-badge
                >
              </q-btn>
              <q-tooltip
                v-if="$notification().tooltip.title"
                id="tooltip--header-notification"
                :model-value="$notification().tooltip.isShow"
                class="bg-amber text-black shadow-4"
                :offset="[10, 10]"
                >{{ $notification().tooltip.title }}</q-tooltip
              >
            </li>
          </ul>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="isDrawerOpen"
        :mini="isDrawerMin"
        :behavior="drawerBehavior"
        :width="240"
        :breakpoint="Number(scss.sizeSm)"
        elevated
        show-if-above
      >
        <q-scroll-area class="fit l-dashboard__drawer">
          <div
            class="l-dashboard__drawer__avatar flex items-center q-gutter-md"
            :class="isDrawerMin ? `q-pa-md` : `q-pa-lg`"
          >
            <AvatarMenu
              :src="$auth().user.avatar"
              :size="isDrawerMin ? 24 : 50"
              :key="Number(isDrawerMin)"
            >
              <q-item clickable @click="onEvent.clickLogin()">
                <q-item-section class="col-2"
                  ><q-icon name="account_circle" color="green"
                /></q-item-section>
                <q-item-section v-if="$auth().token.accessToken"
                  >別アカウントでログイン</q-item-section
                >
                <q-item-section v-else>ログイン</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="onEvent.clickLogout()">
                <q-item-section class="col-2"
                  ><q-icon name="logout" color="green"
                /></q-item-section>
                <q-item-section>ログアウト</q-item-section>
              </q-item>
            </AvatarMenu>
            <p class="ellipsis-2-lines" v-if="!isDrawerMin">
              {{ name || "ゲストユーザー" }}
            </p>
            <q-tooltip
              v-if="isDrawerMin && name"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
            >
              {{ name }}
            </q-tooltip>
          </div>
          <q-list class="q-pt-md">
            <q-item
              v-for="(v, i) of drawerContents"
              clickable
              :class="v.icon ? 'q-py-md' : 'no-pointer-events'"
              class="l-dashboard__drawerItem"
              :style="isDrawerMin ? `width:56px;` : `margin: 0 8px`"
              @click="v.action"
            >
              <q-tooltip
                v-if="isDrawerMin"
                anchor="center right"
                self="center left"
                :offset="[10, 10]"
              >
                {{ v.label }}
              </q-tooltip>
              <div class="flex items-center" :class="v.sub ? 'q-pl-md' : ''">
                <q-icon
                  v-if="v.icon"
                  :name="v.icon"
                  style="opacity: 0.5"
                  size="20px"
                />
                <p
                  v-if="!isDrawerMin"
                  :class="v.icon ? 'q-pl-md' : 'l-dashboard__drawerItem--label'"
                >
                  {{ v.label }}
                </p>
              </div>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page :key="$loading().pageRenderKey">
          <slot />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";
.l-dashboard {
  &__drawer {
    background-color: $dark;
    color: $grey-10;
    .body--dark & {
      background-color: $dark;
      color: white;
    }

    &__avatar {
      flex-wrap: nowrap;
      p {
        color: white;
      }
      border-bottom: 1px inset $grey-9;
    }
  }

  &__drawerItem {
    cursor: pointer;
    border-radius: 16px;
    p,
    i {
      color: white;
    }
    &:hover {
      background-color: $primary;
      opacity: 0.8;
      p,
      i {
        color: black;
      }
    }
    &--label {
      font-size: 13px;
      color: #ffffffaa;
    }
  }
}
</style>
