import { $dto } from "@stores";
import { defineStore } from "pinia";

const primitive = {
  type: "other",
  message: "",
  direction: "",
  limitLength: undefined,
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
    set(personId: Dto.Id, request: Partial<Dto.Request>) {
      this.value[personId] = { ...this.value[personId], ...request };
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
    reuse(issue: Dto.Issue) {
      this.set(issue.personId, {
        type: issue.type,
        message: issue.requestMessage,
        direction: issue.requestDirection,
        limitLength: issue.requestLimitLength,
      });
    },
    async send(personId: Dto.Id) {
      const {
        name: personName,
        relationship: personRelationship,
        avatar: personAvatar,
        character: personCharacter,
        recentStatus: personRecentStatus,
        recentIntimacy: personRecentIntimacy,
      } = $dto().person.value[personId];
      const {
        type,
        message: requestMessage,
        direction: requestDirection,
        limitLength: requestLimitLength,
      } = this.value[personId];
      await useMutation("upsertIssue", {
        data: {
          id: "create",
          type,
          personId,
          personName,
          personRelationship,
          personAvatar,
          personCharacter,
          personRecentStatus,
          personRecentIntimacy,
          requestMessage,
          requestDirection,
          requestLimitLength: Number(requestLimitLength),
        },
      });
    },
  },
});
