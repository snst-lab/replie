import { defineStore } from "pinia";
import { $dto } from "@stores";

const primitive = {
  id: "",
  status: "pending",
  personId: "",
  personRelationship: "",
  personCharacter: "",
  personRecentStatus: "",
  personRecentIntimacy: "",
  requestMessage: "",
  requestDirection: "",
  requestLimitLength: 0,
  result: "",
  createdAt: "",
} satisfies Dto.Issue;

export const useDtoIssueStore = defineStore("dtoIssue", {
  state: () => ({ value: {} as Record<Dto.Id, Dto.Issue> }),
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
    init(issueId: Dto.Id) {
      if (!this.value[issueId]?.id) {
        this.value[issueId] = { ...primitive };
      }
      return { ...this.value[issueId] };
    },
    set(issueId: Dto.Id, issue: Partial<Dto.Issue>) {
      this.value[issueId] = { ...this.value[issueId], ...issue };
      $dto().issueList.setOne(issueId, this.value[issueId]);
      return { ...this.value[issueId] };
    },
    clear(issueId: Dto.Id) {
      this.value[issueId] = { ...primitive };
      $dto().issueList.clearOne(issueId);
      return { ...primitive };
    },
    async fetch(issueId: Dto.Id) {
      // if (this.value[issueId]?.id) {
      //   return { ...this.value[issueId], status, result };
      // }
      const response = (await useQuery("findIssue", {
        where: {
          id: { equals: issueId },
        },
      })) as Dto.Issue;
      return this.set(response.id, response ?? primitive);
    },
    async resend(issueId: Dto.Id) {
      const response = (await useMutation("upsertIssue", {
        data: {
          id: issueId,
        },
      })) as Dto.Issue;
      if (response?.id) {
        this.set(issueId, { status: "pending" });
      }
    },
    async delete(issueId: Dto.Id) {
      const response = (await useMutation("deleteIssue", {
        where: {
          id: issueId,
        },
      })) as boolean;
      if (response) {
        this.clear(issueId);
      }
    },
  },
});
