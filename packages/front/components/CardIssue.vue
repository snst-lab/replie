<script setup lang="ts">
import { $dialog, $dto, $loading } from "@stores";

const props = defineProps<{
  id: string;
  type: string;
  personId: string;
  personName: string;
  status: string;
  datetime: string;
  message: string;
}>();
const router = useRouter();
const { public: constants } = useRuntimeConfig();
const issueStatus = constants.mapper.issueStatus as Json;
const issuesPerPage = constants.number.issuesPerPage as number;

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

const onEvent = {
  swipeLeft: (event: Json) => {
    if (event.evt.target.classList.contains("c-card-issue__foreground")) {
      event.evt.target.classList.add("c-card-issue__foreground--swipe-left");
    }
  },
  swipeRight: (event: Json) => {
    event.evt.target.classList.remove("c-card-issue__foreground--swipe-left");
  },
  clickCard: () => {
    router.push(`/issues/${props.id}/`);
  },
  clickDelete: () => {
    $dialog().show("confirm", {
      message: "相談内容を削除しますか？",
      label: "削除",
      color: "negative",
      icon: "delete",
      action: async () => {
        $loading().show(false);
        await $dto().issue.delete(props.id);
        $dialog().hide("confirm");
        $dialog().show("complete", {
          title: "削除完了",
          message: "相談内容を削除しました。",
        });
        document.querySelectorAll(".c-card-issue__foreground").forEach((el) => {
          el.classList.remove("c-card-issue__foreground--swipe-left");
        });
      },
    });
  },
};
</script>

<template>
  <div class="c-card-issue">
    <div
      class="c-card-issue__foreground"
      :style="`border-left: 4px solid ${useColor('random', personId)}`"
      @click="onEvent.clickCard"
      v-touch-swipe.mouse.left="onEvent.swipeLeft"
      v-touch-swipe.mouse.right="onEvent.swipeRight"
    >
      <div class="no-pointer-events row" style="height: 0px">
        <q-badge
          :color="issueStatus[status].color"
          rounded
          class="q-mt-md q-ml-auto q-mr-md q-py-xs q-px-md"
        >
          {{ issueStatus[status].text }}</q-badge
        >
      </div>
      <div
        class="no-pointer-events q-px-md q-py-md row items-center justify-between"
      >
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
            <small class="">
              {{ dayjs(datetime).format(`YYYY年MM月DD日(dd) HH時mm分`) }}
            </small>
          </div>
          <div class="row items-center q-gutter-x-sm q-pt-sm">
            <q-icon :name="label?.icon" color="grey" />
            <small>{{ label?.text }}</small>
          </div>
          <small class="q-pl-lg q-pt-xs ellipsis-2-lines">
            {{ message }}
          </small>
        </div>
        <q-icon color="grey" size="24px" name="chevron_right" class="block" />
      </div>
    </div>
    <div class="c-card-issue__background row justify-end">
      <q-btn
        class="c-card-issue__background__delete row items-center justify-center"
        icon="delete"
        stack
        flat
        ripple="false"
        color="white"
        @click="onEvent.clickDelete"
        >削除</q-btn
      >
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
  position: relative;
  cursor: pointer;
  height: var(--height);
  min-height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__foreground {
    height: inherit;
    min-height: inherit;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border: 1px solid $grey-2;
    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0.8, 0.45, 1);
    .body--dark & {
      background-color: $grey-10;
      border: 1px solid $grey-9;
    }
    &:hover {
      background-color: $primary;
    }

    &--swipe-left {
      transform: translateX(-80px);
      transition: 0.2s;
      transition-timing-function: cubic-bezier(0, 0.8, 0.45, 1);
    }
  }
  &__background {
    height: inherit;
    min-height: inherit;
    background-color: $secondary;
    width: 100%;
    height: inherit;
    position: absolute;
    z-index: 0;
    top: 0;

    &__delete {
      width: 80px;
      height: inherit;
      box-shadow: 4px 0 4px rgba(0, 0, 0, 0.2) inset;
    }
  }
}
</style>
