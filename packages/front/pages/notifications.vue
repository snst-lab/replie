<script setup lang="ts">
import { $notification } from "@stores";
import { tools } from "@tools";
definePageMeta({
  layout: "dashboard",
});
const { public: constants } = useRuntimeConfig();
const { notificationsPerPage } = constants.number;

const history = ref<Dto.Notification[]>([]);

onMounted(async () => {
  await $notification().fetchNew();
});

const onEvent = {
  scrollDown: async (index: number, done: () => void) => {
    if ($notification().history.length < notificationsPerPage) {
      await done();
      return;
    }
    await tools.sleep(1000);
    await $notification().fetchPast();
    await tools.sleep(1000);
    await done();
  },
};
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center>通知一覧</TextTitle>
    <template v-if="$notification().history[0]">
      <q-infinite-scroll
        @load="onEvent.scrollDown"
        :offset="250"
        scroll-target="body"
      >
        <template #default>
          <CardNotification
            v-for="(v, i) in $notification().history"
            :index="i"
            :data="v"
          />
        </template>
        <template #loading>
          <div
            class="row justify-center q-my-md"
            v-if="$notification().history.length >= notificationsPerPage"
          >
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </template>
    <template v-else>
      <div class="q-mt-xl flex justify-center">
        <p class="text-subtitle1">通知はありません</p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
