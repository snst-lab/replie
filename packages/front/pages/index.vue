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
      description="返信先の相手を選び、相手からのメッセージを元に、返信のしかたについてChatGPTからアドバイスをもらいます。"
      @click="router.push(`/persons/`)"
    />
    <CardAction
      icon="person"
      class="q-mt-lg"
      title="返信先を登録"
      description="返信相手の名前、あなたとの関係、相手の性格などを登録できます。"
      @click="router.push(`/persons/create/`)"
    />
    <CardAction
      icon="search"
      class="q-mt-lg"
      title="相談結果を見る"
      description="あなたが相談した内容とChatGPTからのアドバイスを一覧できます。"
      @click="router.push(`/issues/`)"
    />
  </div>
</template>
