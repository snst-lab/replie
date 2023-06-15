<script setup lang="ts">
import { $dto } from "@stores";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const personList = ref<Dto.Person[]>($dto().personList.init());

onMounted(async () => {
  personList.value = await $dto().personList.fetch();
  personList.value = personList.value.filter((e) => e.id !== "create");
  if (!personList.value.length) {
    router.replace("/persons/create/");
  }
});

const onEvent = {
  clickCard: (personId: string) => {
    router.push(`/request/${personId}/`);
  },
  clickAdd: () => {
    router.push(`/persons/create/`);
  },
};
</script>

<template>
  <div class="p-persons q-pb-xl">
    <template v-if="personList.length">
      <TextTitle center back="/">誰への返事をしますか</TextTitle>
      <p class="q-pb-sm q-px-md">返事をする相手を選んでください。</p>
      <CardPerson
        v-for="(v, i) in personList"
        :id="v.id"
        :avatar="v.avatar"
        :name="v.name"
        :relationship="v.relationship"
        canDelete
        @click="onEvent.clickCard(v.id)"
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
