<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  contrast?: number;
  hideSlider?: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const value = ref<number>(props.modelValue);
const contrast = ref<number>(props.contrast ?? 0);
const percentage = ref<number>(0);

class Input {
  static correct() {
    if (isNaN(value.value)) {
      value.value = 0;
    }
    if (value.value > contrast.value) {
      value.value = contrast.value;
    }
    if (value.value < 0) {
      value.value = 0;
    }
  }
}
class Buttons {
  static holdtime = 500;
  static interval = {} as NodeJS.Timer;
  static clickUp() {
    if (value.value < contrast.value) {
      value.value += 1;
    }
  }
  static clickDown() {
    if (value.value > 0) {
      value.value -= 1;
    }
  }
  static mouseHoldUp() {
    let time = 0;
    Buttons.interval = setInterval(function () {
      time += 80;
      if (time > Buttons.holdtime && value.value < contrast.value) {
        value.value += 1;
      }
    }, 80);
  }
  static mouseHoldDown() {
    let time = 0;
    Buttons.interval = setInterval(function () {
      time += 80;
      if (time > Buttons.holdtime && value.value > 0) {
        value.value -= 1;
      }
    }, 80);
  }
  static mouseRelease() {
    clearInterval(Buttons.interval);
  }
}
watch(percentage, () => {
  value.value = Math.floor(contrast.value * percentage.value) / 100;
});
watch(value, () => {
  emit("update:modelValue", value.value);
});
onMounted(() => {
  percentage.value = (value.value / contrast.value) * 100;
});
</script>

<template>
  <div class="c-input-amount">
    <input
      class="c-input-amount__input"
      type="tel"
      v-model="value"
      @click="Input.correct()"
      @focusout="Input.correct()"
      pattern="^[0-9]+$"
    />
    <div class="c-input-amount__label">数量</div>
    <div class="c-input-amount__unit">USD</div>
    <div class="c-input-amount__buttons">
      <div
        class="c-input-amount__buttons__1"
        @click.prevent="Buttons.clickUp()"
        @mousedown.prevent="Buttons.mouseHoldUp()"
        @mouseup.prevent="Buttons.mouseRelease()"
      >
        ▲
      </div>
      <div
        class="c-input-amount__buttons__2"
        @click.prevent="Buttons.clickDown()"
        @mousedown.prevent="Buttons.mouseHoldDown()"
        @mouseup.prevent="Buttons.mouseRelease()"
      >
        ▼
      </div>
    </div>
  </div>
  <div class="q-pt-lg" v-if="!hideSlider">
    <q-slider
      v-model="percentage"
      :min="0"
      :max="100"
      label
      :label-value="percentage + '%'"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";

.c-input-amount {
  position: relative;

  &__label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    color: $grey-10;
  }

  &__input {
    width: 100%;
    padding: 14px 80px 14px 60px;
    border: none;
    border-radius: 6px;
    background-color: $grey-4;
    outline: 2px solid transparent;
    transition: 0.2s;
    &:focus {
      background-color: white;
      outline: 2px solid $primary;
    }
  }
  &__unit {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    color: $grey-10;
  }
  &__buttons {
    position: absolute;
    color: $grey-8;
    top: 50%;
    transform: translateY(-50%);
    right: 0px;
    font-size: 10px;
    cursor: pointer;

    &__1,
    &__2 {
      padding: 5px 10px 5px 5px;
      transition: 0.2s;
      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
