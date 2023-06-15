import { defineStore } from "pinia";
import { $dto } from "@stores";
import { tools } from "@tools";

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
    set(issueId: Dto.Id, issue: Dto.Issue) {
      this.value[issueId] = issue;
      $dto().issueList.setOne(issueId, issue);
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
    async update(issueId: Dto.Id, issue: Dto.Issue) {
      // TODO:  APIを呼ぶ
      return (this.value[issueId] = issue);
    },
  },
});
