import { defineStore } from "pinia";
import { $dialog, $dto } from "@stores";

const primitive = {
  id: "",
  type: "other",
  status: "pending",
  personId: "",
  personName: "",
  personRelationship: "",
  personAvatar: "",
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
      $dto().issueList.set(issueId, this.value[issueId]);
    },
    clear(issueId: Dto.Id) {
      this.value[issueId] = { ...primitive };
      $dto().issueList.clear(issueId);
    },
    async fetch(issueId: Dto.Id) {
      const response = (await useQuery("findIssue", {
        where: {
          id: { equals: issueId },
        },
      })) as Dto.Issue;
      await this.set(response.id, response);
      return { ...this.value[issueId] };
    },
    async retry(issueId: Dto.Id) {
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
