<script setup lang="ts">
const props = defineProps<{
  type: string;
  personId: string;
  personName: string;
  status: string;
  datetime: string;
  message: string;
}>();

const { public: constants } = useRuntimeConfig();
const issueStatus = constants.mapper.issueStatus as Json;
const issuesPerPage = constants.number.issuesPerPage as number;

const personId = props.personId ?? "0000000";
const label = (() => {
  switch (props.type) {
    case "reply":
      return {
        icon: "reply",
        text: "以下のメッセージへの返信アドバイスです",
      };
    case "other":
      return {
        icon: "chat_bubble",
        text: "相談内容",
      };
    default:
      return {
        icon: "chat_bubble",
        text: "相談内容",
      };
  }
})();
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
          <q-icon :name="label?.icon" color="grey" />
          <small>{{ label?.text }}</small>
        </div>
        <small class="q-pl-lg q-pt-xs text-grey-8 ellipsis-2-lines">
          {{ message }}
        </small>
      </div>
      <q-icon color="grey" size="24px" name="chevron_right" class="block" />
    </div>
  </div>
</template>

<style scoped>
.c-card-issue {
  --height: v-bind(100 / issuesPerPage + "vh");
}
</style>

<style lang="scss" scoped>
@import "assets/css";
.c-card-issue {
  cursor: pointer;
  height: var(--height);
  min-height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 1px solid $grey-4;
  transition: background-color 0.2s;

  .body--dark & {
    background-color: $grey-10;
    border: 1px solid $grey-8;
  }
  &:hover {
    background-color: $primary;
  }
}
</style>
