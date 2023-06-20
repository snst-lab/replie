<script setup lang="ts">
import { $dialog, $dto, $loading } from "@stores";

const props = defineProps<{
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
  icon?: string;
  canDelete?: boolean;
  onClick?: (personId: string) => void;
}>();
const router = useRouter();
const { public: constants } = useRuntimeConfig();
const personsPerPage = constants.number.personsPerPage as number;

const onEvent = {
  swipeLeft: (event: Json) => {
    if (!props.canDelete) return;
    if (event.evt.target.classList.contains("c-card-person__foreground")) {
      event.evt.target.classList.add("c-card-person__foreground--swipe-left");
    }
  },
  swipeRight: (event: Json) => {
    if (!props.canDelete) return;
    event.evt.target.classList.remove("c-card-person__foreground--swipe-left");
  },
  clickCard: () => {
    if (!props.onClick) return;
    props.onClick(props.id);
  },
  clickDelete: () => {
    if (!props.canDelete) return;
    $dialog().show("confirm", {
      message: "返信相手の情報を削除しますか？",
      label: "削除",
      color: "negative",
      icon: "delete",
      action: async () => {
        $loading().show(false);
        await $dto().person.delete(props.id);
        $dialog().hide("confirm");
        $dialog().show("complete", {
          title: "削除完了",
          message: "返信相手の情報を削除しました。",
        });
        document
          .querySelectorAll(".c-card-person__foreground")
          .forEach((el) => {
            el.classList.remove("c-card-person__foreground--swipe-left");
          });
      },
    });
  },
};
</script>

<template>
  <div class="c-card-person">
    <div
      class="c-card-person__foreground q-px-md q-py-md flex items-center justify-between"
      :style="`border-left: 4px solid ${useColor('random', id)}`"
      @click="onEvent.clickCard"
      v-touch-swipe.mouse.left="onEvent.swipeLeft"
      v-touch-swipe.mouse.right="onEvent.swipeRight"
    >
      <div class="no-pointer-events row items-center">
        <Avatar outline animal :seed="id" />
        <div class="q-px-md">
          <p class="ellipsis">{{ name }}</p>
          <small class="row items-center text-grey ellipsis">{{
            relationship
          }}</small>
        </div>
      </div>
      <q-icon color="grey" size="24px" :name="icon" />
    </div>
    <div class="c-card-person__background row justify-end">
      <q-btn
        class="c-card-person__background__delete row items-center justify-center"
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
.c-card-person {
  --height: v-bind(100 / personsPerPage + "vh");
}
</style>

<style lang="scss" scoped>
@import "assets/css";
.c-card-person {
  position: relative;
  cursor: pointer;
  height: var(--height);
  min-height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__foreground {
    height: inherit;
    min-height: inherit;
    position: relative;
    z-index: 1;
    background-color: white;
    border: 1px solid $grey-2;
    transition: 0.2s;
    transition-timing-function: cubic-bezier(0, 0.8, 0.45, 1);
    .body--dark & {
      background-color: $grey-10;
      border: 1px solid $grey-9;
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
