<script setup lang="ts">
const props = defineProps<{
  provider: Auth.Type;
  small?: boolean;
}>();
const router = useRouter();

function toUpperCamelCase(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
function onClick() {
  router.push(`/login/${props.provider}/`);
}
</script>

<template>
  <figure
    class="c-button-social-login row items-center"
    @click="onClick"
    :style="{
      padding: small ? '1rem' : '1rem 2rem',
      borderRadius: small ? '50%' : '2rem',
    }"
  >
    <img :src="`/_nuxt/assets/icons/social/${provider}.svg`" />
    <p v-if="!small">{{ toUpperCamelCase(provider as string) }} でログイン</p>
  </figure>
</template>

<style scoped lang="scss">
@import "assets/css";
.c-button-social-login {
  cursor: pointer;
  user-select: none;
  border: 1px solid #ddd;
  background-color: #fafafa;
  .body--dark & {
    border-color: #777;
    background-color: #333;
  }
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: $primary;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
  p {
    margin-left: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
}
</style>
