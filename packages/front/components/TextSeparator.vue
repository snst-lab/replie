<template>
  <div class="c-text-separater">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import "assets/css";

.c-text-separater {
  color: $grey-10;
  display: inline-flex;
  align-items: center;
  width: 100%;
  .body--dark & {
    color: $grey-5;
  }
  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: $grey-4;
    .body--dark & {
      background-color: $grey-6;
    }
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
}
</style>
