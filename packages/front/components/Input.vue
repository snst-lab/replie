<script setup lang="ts">
import { ValidationRule } from "quasar";
import { VNodeRef } from "vue";

const props = defineProps<{
  value?: string | number;
  label?: string;
  type?:
    | "text"
    | "textarea"
    | "password"
    | "number"
    | "email"
    | "tel"
    | "url"
    | "static";
  icon?: string;
  unit?: string;
  rows?: number;
  candidates?: (string | number)[];
  must?: boolean;
  rules?: ValidationRule[];
}>();
const emit = defineEmits(["update:value"]);

const value = ref<string | number | undefined>(props.value);
const type = ref<string>(props.type ?? "text");
const isTextArea = computed(() => type.value === "textarea");
const isStatic = type.value === "static";

const rows = props.rows ?? 4;
const hasCandidates = props.candidates && props.candidates.length > 0;

const rules = (() => {
  if (props.rules && props.must) {
    return [...props.rules, (val: string) => val.length > 0 || "入力必須です"];
  } else if (!props.rules && props.must) {
    return [(val: string) => val.length > 0 || "入力必須です"];
  } else if (props.rules && !props.must) {
    return props.rules;
  }
})();

if (!isStatic) {
  watch(value, () => {
    emit("update:value", value.value);
  });
}

const onEvent = {
  clickCandidate: (event: Json) => {
    value.value = event.target.innerText;
  },
};
</script>

<template>
  <div class="c-input q-my-xs">
    <div v-if="label" class="c-input__label">
      <span>{{ label }}</span>
      <q-badge
        v-if="must"
        rounded
        class="q-ml-sm q-pr-sm q-pl-xs"
        color="warning"
        >必須</q-badge
      >
    </div>
    <dl class="c-input__candidates q-py-xs" v-if="hasCandidates">
      <dd v-for="e in candidates" @click="onEvent.clickCandidate">{{ e }}</dd>
    </dl>
    <div v-if="!isStatic" class="row items-center">
      <q-field
        :model-value="value"
        class="c-input__field q-pt-xs col"
        outlined
        :rules="rules"
      >
        <q-icon class="c-input__field__icon" :name="icon" />
        <textarea
          v-if="isTextArea"
          class="c-input__field__input"
          v-model="value"
          :rows="rows"
          @blur="$emit('blur')"
        />
        <input
          v-else
          class="c-input__field__input"
          v-model="value"
          :type="type"
          @blur="$emit('blur')"
        />
      </q-field>
      <div v-if="unit" class="q-px-sm q-mb-md">
        {{ unit }}
      </div>
    </div>
    <q-field
      v-else
      :model-value="value"
      class="c-input__field--static q-pt-xs"
      outlined
      :rules="rules"
      reactive-rules
    >
      {{ value }} {{ unit }}
    </q-field>
  </div>
</template>

<style>
.c-input {
  --paddingLeft: v-bind(icon ? "50px": "20px");
}
</style>

<style lang="scss">
@import "assets/css";

.c-input {
  &__label {
    color: $grey-7;
    text-indent: 4px;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 1px;

    .body--dark & {
      color: white;
    }
  }

  &__candidates {
    overflow-x: scroll;
    white-space: nowrap;

    dd {
      cursor: pointer;
      color: $grey-7;
      font-size: 11px;
      display: inline-block;
      border: 1px solid $grey-5;
      border-radius: 12px;
      padding: 4px 8px;
      margin: 0px 4px;

      .body--dark & {
        color: white;
      }
      &:hover {
        transition: 0.2s;
        background: $primary;
      }
    }
  }

  &__field {
    position: relative;
    width: 100%;

    &__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
      color: white;
      .body--light & {
        color: $grey-9;
      }
    }
    &__input {
      width: 100%;
      padding: 12px 50px 12px 50px;
      padding-left: var(--paddingLeft);
      min-height: 56px;
      outline: 2px solid transparent;
      transition: 0.2s;
      color: white;
      background-color: $grey-10;
      border-top: 1px solid $grey-9;
      border-bottom: 1px solid $grey-9;
      border-left: 1px solid $grey-9;
      border-right: 1px solid $grey-9;
      resize: none;

      .body--light & {
        color: $grey-10;
        background-color: $grey-1;
        border-top: 1px solid $grey-4;
        border-bottom: 1px solid $grey-4;
        border-left: 1px solid $grey-4;
        border-right: 1px solid $grey-4;
      }
      &:focus {
        border: 1px solid $primary;
      }
      letter-spacing: 1px;
      line-height: 18px;
    }

    &--static {
      width: 100%;
      .q-field__control {
        min-height: 24px !important;

        .q-field__control-container {
          color: $grey-10;

          .body--dark & {
            color: white;
          }
        }
      }
      .q-field__control:before,
      .q-field__control:after {
        display: none;
        border: none !important;
      }
      .q-field__bottom--animated {
        padding: 0 !important;
      }
    }
  }

  * {
    user-select: none;
  }

  .q-field--outlined .q-field__control {
    padding: 0 !important;
    display: flex;
    align-items: center;
  }

  .q-field__marginal {
    height: unset !important;
    position: absolute;
    right: 14px;
  }
}
</style>
