<script setup lang="ts">
import { $notification } from "@stores";

const props = defineProps<{
  index: number;
  data: Dto.Notification;
}>();

const router = useRouter();

const randomSeed = props.data.personId ?? dayjs().unix().toString();

const onEvent = {
  clickCard: () => {
    if (props.data.unread) {
      $notification().read(props.data.id);
    }
    if (props.data.linkTo) {
      router.push(props.data.linkTo);
    }
  },
};
</script>

<template>
  <div
    class="c-card-notification"
    :style="`border-left: 4px solid ${useColor('random', randomSeed)}`"
    @click="onEvent.clickCard"
  >
    <div style="height: 0px" class="row">
      <q-badge
        :color="data.unread ? 'positive' : 'transparent'"
        rounded
        class="q-mt-md q-ml-auto q-mr-md"
      >
      </q-badge>
    </div>
    <div class="q-px-md q-py-md row items-center justify-between">
      <div class="col-10">
        <div class="row items-center no-wrap">
          <Avatar outline animal :seed="randomSeed" />
          <p class="q-px-md ellipsis">
            {{ data.title }}
          </p>
        </div>
        <div class="row items-center q-gutter-x-sm q-pt-sm q-pl-sm">
          <div class="q-pt-xs">
            <small class="text-grey-8 ellipsis-2-lines">
              {{ data.message }}
            </small>
          </div>
          <div class="q-pt-xs">
            <q-icon name="schedule" color="grey" />
            <small class="q-pl-xs">
              {{ dayjs(data.createdAt).fromNow() }}
            </small>
          </div>
        </div>
      </div>
      <div class="col-1">
        <q-icon color="grey" size="24px" name="chevron_right" class="block" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-card-notification {
  height: 20vh;
  cursor: pointer;
  transition: 0.2s;
  background-color: white;
  border: 1px solid $grey-4;
  .body--dark & {
    background-color: $grey-10;
    border: 1px solid $grey-8;
  }
  &:hover {
    background-color: $primary;
  }
}
</style>
