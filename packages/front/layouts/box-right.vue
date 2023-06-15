<script setup lang="ts">
import { Dark, Screen, colors } from "quasar";
const router = useRouter();
const onEvent = {
  clickHome: () => {
    router.push("/");
  },
};
</script>

<template>
  <NuxtLayout name="default">
    <div class="l-box-right">
      <div class="l-box-right__catch">Catch Copy Here</div>
      <div class="l-box-right__content q-pa-lg">
        <slot />
        <div class="l-box-right__content__buttons q-pa-lg">
          <q-btn
            v-if="Dark.isActive"
            flat
            icon="light_mode"
            size="16px"
            @click="Dark.toggle"
          />
          <q-btn
            v-else
            flat
            icon="dark_mode"
            size="16px"
            @click="Dark.toggle"
          />
          <q-btn flat icon="home" size="16px" @click="onEvent.clickHome" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "assets/css";
.l-box-right {
  width: 100%;
  height: 100vh;
  background: url(https://unsplash.it/640) no-repeat center/cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include mobile {
    justify-content: right;
  }

  &__content {
    width: 100%;
    max-width: 400px;
    height: inherit;
    background-color: $grey-9;
    box-shadow: 0 0 30px $grey-5;
    position: relative;

    .body--light & {
      background-color: white;
    }

    &__buttons {
      position: absolute;
      top: auto;
      bottom: 0;
      left: auto;
      right: 0;
    }
  }

  &__catch {
    padding-left: 4%;
    font-size: 48px;
    font-weight: bold;
    text-shadow: 2px 2px 10px $grey-10;
    animation: blur 0.5s ease-in forwards;
    user-select: none;

    color: white;
    @keyframes blur {
      0% {
        transform: translateY(-8px);
        filter: blur(10px);
      }
      100% {
        transform: translateY(0px);
        filter: blur(0px);
      }
    }
    @include mobile {
      display: none;
    }
  }
}
</style>
