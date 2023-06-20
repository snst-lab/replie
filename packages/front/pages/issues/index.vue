<script setup lang="ts">
import { $dto } from "@stores";
import { tools } from "@tools";
definePageMeta({
  layout: "dashboard",
});
const router = useRouter();

const { public: constants } = useRuntimeConfig();
const { issuesPerPage } = constants.number;

onMounted(async () => {
  await $dto().issueList.fetchNew();
});

const onEvent = {
  clickCard: (personId: string, issueId: string) => {
    router.push(`/issues/${issueId}/`);
  },
  scrollDown: async (index: number, done: () => void) => {
    if ($dto().issueList.value.length < issuesPerPage) {
      await done();
      return;
    }
    await tools.sleep(1000);
    await $dto().issueList.fetchPast();
    await tools.sleep(1000);
    await done();
  },
};
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center back>相談結果を見る</TextTitle>
    <template v-if="$dto().issueList.value[0]">
      <q-infinite-scroll @load="onEvent.scrollDown" :offset="0">
        <template #default>
          <CardIssue
            v-for="e in $dto().issueList.value"
            :type="e.type"
            :personId="e.personId"
            :personName="e.personName"
            :personAvatar="e.personAvatar"
            :status="e.status"
            :datetime="e.createdAt"
            :message="e.requestMessage"
            @click="onEvent.clickCard(e.personId, e.id)"
          />
        </template>
        <template #loading>
          <div
            class="row justify-center q-my-md"
            v-if="$dto().issueList.value.length >= issuesPerPage"
          >
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </template>
    <template v-else>
      <div class="q-mt-xl flex justify-center">
        <p class="text-subtitle1">相談結果はありません</p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
