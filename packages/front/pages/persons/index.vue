<script setup lang="ts">
import { $dto } from "@stores";
import { tools } from "@tools";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();

onMounted(async () => {
  await $dto().personList.fetch();
  if (!$dto().personList.value[0]) {
    router.replace("/persons/create/");
  }
});

const onEvent = {
  clickPerson: (personId: string) => {
    router.push(`/request/${personId}/`);
  },
  clickAdd: () => {
    router.push(`/persons/create/`);
  },
};
</script>

<template>
  <div class="p-persons q-pb-xl">
    <template v-if="$dto().personList.value[0]">
      <TextTitle center back="/">誰への返信をしますか</TextTitle>
      <p class="q-pb-sm q-px-md">返信先の相手を選んでください。</p>
      <CardPerson
        v-for="(v, i) in $dto().personList.value"
        :id="v.id"
        :avatar="v.avatar"
        :name="v.name"
        :relationship="v.relationship"
        canDelete
        :onClick="onEvent.clickPerson"
        icon="chevron_right"
      />
    </template>
    <template v-else>
      <TextTitle center back>相手の登録がありません</TextTitle>
      <p class="q-pb-sm q-px-md">
        右下の「+」ボタンから新しい相手を登録してください 。
      </p>
    </template>
    <q-btn
      round
      color="primary"
      size="18px"
      icon="add"
      class="p-persons__create"
      @click="onEvent.clickAdd()"
    />
  </div>
</template>

<style lang="scss" scoped>
.p-persons {
  &__create {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }
}
</style>
