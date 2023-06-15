import { defineStore } from "pinia";
import { $dto } from "@stores";
import { tools } from "@tools";

export const useDtoPromptStore = defineStore("prompt", {
  state: () => ({}),
  getters: {
    value() {
      return (personId: Dto.Id) => {
        const person = $dto().person.value[personId];
        const request = $dto().request.value[personId];

        return tools.prompt.issue(
          person?.relationship ?? "",
          person?.character ?? "",
          person?.recentStatus ?? "",
          person?.recentIntimacy ?? "",
          request?.message ?? "",
          request?.direction ?? "",
          request?.limitLength ?? 0
        );
      };
    },
  },
});
