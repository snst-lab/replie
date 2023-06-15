<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();

onMounted(async () => {});

const onEvent = {
  clickCard: (personId: string) => {
    router.push(`/request/${personId}/`);
  },
};
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center back>設定</TextTitle>
    <p class="q-py-sm q-px-md">通知設定</p>
    <CardConfig icon="notifications_none" name="pushNotification"
      >アプリ内通知</CardConfig
    >
    <CardConfig icon="email" name="emailNotification">メール通知</CardConfig>
    <p class="q-py-sm q-px-md">表示設定</p>
    <CardConfig icon="dark_mode" name="darkMode">ダークモード</CardConfig>
  </div>
</template>

<style lang="scss" scoped></style>
