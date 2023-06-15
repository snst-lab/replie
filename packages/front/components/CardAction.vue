<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  description: string;
  bgColor?: string;
}>();

const colorPrimary = useColor("primary");
</script>

<template>
  <div
    class="c-card-action q-px-md q-py-lg cursor-pointer"
    :style="`
  background-color:${bgColor ?? colorPrimary};
  `"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <q-icon
          :name="icon"
          size="20px"
          style="color: #555; margin-right: 6px"
        />
        <p class="text-h6 text-bold" style="color: #555">{{ title }}</p>
      </div>
      <svg
        style="width: 20px; height: 20px"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
          stroke="#555"
        />
      </svg>
    </div>
    <p class="q-pt-sm" style="color: #555">
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.c-card-action {
  width: 100%;
  border-radius: 16px;
  border: 4px solid #555;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
</style>
