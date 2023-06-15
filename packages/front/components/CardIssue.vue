<script setup lang="ts">
const props = defineProps<{
  personId: string;
  personName: string;
  status: string;
  datetime: string;
  message: string;
}>();

const { public: constants } = useRuntimeConfig();
const issueStatus = constants.mapper.issueStatus as Json;

const personId = props.personId ?? "0000000";
</script>

<template>
  <div
    class="c-card-issue"
    :style="`border-left: 4px solid ${useColor('random', personId)}`"
  >
    <div style="height: 0px" class="row">
      <q-badge
        :color="issueStatus[status].color"
        rounded
        class="q-mt-md q-ml-auto q-mr-md q-py-xs q-px-md"
      >
        {{ issueStatus[status].text }}</q-badge
      >
    </div>
    <div class="q-px-md q-py-md row items-center justify-between">
      <div class="col-10">
        <div class="row items-center no-wrap">
          <Avatar outline animal :seed="personId" />
          <p class="q-px-md ellipsis">
            {{ personName }}
          </p>
        </div>
        <div class="row items-center q-gutter-x-sm q-pt-sm">
          <q-icon name="calendar_month" color="grey" />
          <small> 相談日時 </small>
          <small class="text-grey-8">
            {{ dayjs(datetime).format(`YYYY年MM月DD日(dd) HH時mm分`) }}
          </small>
        </div>
        <div class="row items-center q-gutter-x-sm q-pt-sm">
          <q-icon name="chat_bubble" color="grey" />
          <small>相手からのメッセージ</small>
        </div>
        <small class="q-pl-lg q-pt-xs text-grey-8 ellipsis-2-lines">
          {{ message }}
        </small>
      </div>
      <div class="col-1">
        <q-icon color="grey" size="24px" name="chevron_right" class="block" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-card-issue {
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