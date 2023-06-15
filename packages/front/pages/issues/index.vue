<script setup lang="ts">
import { $dto } from "@stores";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();

const issueList = ref<Dto.Issue[]>($dto().issueList.init());
const personList = ref<Dto.Person[]>($dto().personList.init());

onMounted(async () => {
  issueList.value = await $dto().issueList.fetch();
});

const onEvent = {
  clickCard: (personId: string, issueId: string) => {
    router.push(`/issues/${issueId}/`);
  },
};
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center back>相談結果を見る</TextTitle>
    <template v-if="issueList.length">
      <CardIssue
        v-for="e in issueList"
        :personId="e.personId"
        :personName="personList.find((p) => p.id === e.personId)?.name ?? ''"
        :status="e.status"
        :datetime="e.createdAt"
        :message="e.requestMessage"
        @click="onEvent.clickCard(e.personId, e.id)"
      />
    </template>
    <template v-else>
      <div class="q-mt-xl flex justify-center">
        <p class="text-subtitle1">相談結果はありません</p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
