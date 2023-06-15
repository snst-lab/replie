<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
</script>

<template>
  <TextTitle check>操作を選んでください</TextTitle>
  <div class="q-px-md">
    <CardAction
      icon="lightbulb"
      title="返信内容を相談する"
      description="返信をする相手を選び、相手のメッセージに基づいて、AIにアドバイスをもらいます。"
      @click="router.push(`/persons/`)"
    />
    <CardAction
      icon="edit"
      class="q-mt-lg"
      title="返信先を登録"
      description="返信相手とあなたの関係、相手の性格、最近の状況などを登録できます。"
      @click="router.push(`/persons/create/`)"
    />
    <CardAction
      icon="search"
      class="q-mt-lg"
      title="相談結果を見る"
      description="あなたが相談した内容とAIからのアドバイスを一覧できます。"
      @click="router.push(`/issues/`)"
    />
  </div>
</template>
