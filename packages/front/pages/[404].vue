<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <TextTitle center>404エラー</TextTitle>
  <div
    class="column items-center justify-end flex justify-center q-px-md"
    style="height: 50vh"
  >
    <em class="p-error-message text-negative">
      指定されたページは存在しません。
    </em>
  </div>
  <div class="column items-center justify-end" style="height: 25vh">
    <Button
      @click="$router.push('/')"
      label="トップページへ戻る"
      color="info"
    />
  </div>
</template>

<style lang="scss" scoped>
.p-error-message {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 16px;
  border: 4px solid #ccc;
  background-color: #fafafa;
  padding: 96px 16px;
  .body--dark & {
    border-color: #555;
    background-color: #333;
  }
}
</style>
