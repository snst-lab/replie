<script lang="ts" setup>
const props = defineProps<{
  onDrop?: (event: Event, data: any) => {};
}>();

const accept = "*";
const textPc = "ファイルをここにドロップ";
const textSp = "クリックしてファイルを選択";
const isDragging = ref(false);

const refs = {
  input: ref<HTMLInputElement>({} as HTMLInputElement),
};
const onEvent = {
  dragEnter: (event: DragEvent) => {
    isDragging.value = true;
  },
  dragLeave: (event: DragEvent) => {
    isDragging.value = false;
  },
  drop: (event: DragEvent) => {
    isDragging.value = false;
    const files = event.dataTransfer?.files;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = {
        name: files?.[0].name,
        size: files?.[0].size,
        type: files?.[0].type,
        base64: e.target?.result,
      };
      if (props.onDrop) {
        props.onDrop(event, data);
      }
    };
    if (files?.[0]) {
      reader.readAsDataURL(files?.[0]);
    }
  },
  click: (event: PointerEvent) => {
    refs.input.value.click();
  },
  changeFile: (event: any) => {
    onEvent.drop(event);
  },
};
</script>
<template>
  <div class="c-input-drop">
    <div
      :class="`c-input-drop__area ${isDragging ? 'dragEnter' : ''}`"
      @dragover.stop.prevent
      @dragenter.stop.prevent="onEvent.dragEnter"
      @mouseenter.stop.prevent="onEvent.dragEnter"
      @dragleave.prevent="onEvent.dragLeave"
      @mouseleave.prevent="onEvent.dragLeave"
      @drop.stop.prevent="onEvent.drop"
      @click="onEvent.click"
    >
      <div v-if="useAgent().pc">
        <q-icon name="upload" />
        <span> {{ textPc }} </span>
      </div>
      <div v-else>
        <q-icon name="upload" />
        <span> {{ textSp }} </span>
      </div>
    </div>
    <input
      type="file"
      :ref="refs.input"
      :accept="accept"
      style="display: none"
      @change="onEvent.changeFile"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";
.c-input-drop {
  width: 100%;

  &__area {
    cursor: pointer;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    border: 5px dashed $grey-5;
    border-radius: 20px;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    transition: 0.2s;
    svg {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
      width: 50px;
      height: 50px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
    @include mobile() {
      height: 200px;
    }
    &.dragEnter {
      border: 5px dashed $primary;
      background-color: $grey-12;
      span,
      i {
        color: $primary;
      }
    }
  }
}
</style>
