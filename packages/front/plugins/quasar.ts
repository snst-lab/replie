import { Quasar, Loading, QSpinnerDots } from "quasar";
import * as components from "quasar";
import langJa from "quasar/lang/ja";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    components,
    plugins: {
      Loading,
    },
    lang: langJa,
  });
});

Loading.setDefaults({
  spinner: QSpinnerDots,
  spinnerColor: "primary",
  backgroundColor: "white",
});
