import { $dto } from "@stores";
import { defineStore } from "pinia";

const primitive = {
  message: "",
  direction: "",
  limitLength: 0,
} satisfies Dto.Request;

export const useDtoRequestStore = defineStore("dtoRequest", {
  state: () => ({ value: {} as Record<Dto.Id, Dto.Request> }),
  persist: {
    enabled: true,
    lifetime: "long",
    scope: "global",
  },
  getters: {
    primitive() {
      return { ...primitive };
    },
  },
  actions: {
    init(personId: Dto.Id) {
      if (!this.value[personId]?.message) {
        this.value[personId] = { ...primitive };
      }
      return { ...this.value[personId] };
    },
    set(personId: Dto.Id, request: Dto.Request) {
      this.value[personId] = request;
      return { ...this.value[personId] };
    },
    clear(personId: Dto.Id) {
      this.value[personId] = { ...primitive };
      return { ...primitive };
    },
    get(personId: Dto.Id) {
      if (this.value[personId]?.message) {
        return { ...this.value[personId] };
      }
      return { ...primitive };
    },
    async send(personId: Dto.Id) {
      const {
        relationship: personRelationship,
        character: personCharacter,
        recentStatus: personRecentStatus,
        recentIntimacy: personRecentIntimacy,
      } = $dto().person.value[personId];
      const {
        message: requestMessage,
        direction: requestDirection,
        limitLength: requestLimitLength,
      } = this.value[personId];
      await useMutation("createIssue", {
        data: {
          id: "create",
          personId,
          personRelationship,
          personCharacter,
          personRecentStatus,
          personRecentIntimacy,
          requestMessage,
          requestDirection,
          requestLimitLength,
        },
      });
    },
  },
});
