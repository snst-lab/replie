import { VNodeRef } from "vue";

export async function useValidate(form: VNodeRef & { value: any }) {
  const valid = await form.value?.validate();
  nextTick(() => {
    const errorItem = document.querySelector(
      ".q-field--error, .q-table--error"
    );
    if (errorItem) {
      const inputItem = errorItem.getElementsByTagName("input")[0];
      const scrollPosition =
        errorItem.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      inputItem?.focus();
    }
  });
  if (!valid) {
    return Promise.reject("Validation failed");
  } else {
    return true;
  }
}
