import { tools } from "@tools";
import { defineStore } from "pinia";

export const useDtoIssueListStore = defineStore("dtoIssueList", {
  state: () => ({ value: [] as Dto.Issue[] }),
  persist: {
    enabled: true,
    lifetime: "session",
    scope: "global",
  },
  getters: {
    primitive() {
      return [];
    },
  },
  actions: {
    init() {
      if (this.value[0]) {
        return [...this.value];
      } else {
        this.value = [];
        return [];
      }
    },
    setOne(issueId: Dto.Id, issue: Dto.Issue) {
      const index = this.value.findIndex((e) => e.id === issueId);
      if (index === -1) {
        this.value.push(issue);
      } else {
        this.value[index] = issue;
      }
      return [...this.value];
    },
    clearOne(issueId: Dto.Id) {
      const index = this.value.findIndex((e) => e.id === issueId);
      if (index !== -1) {
        this.value.splice(index, 1);
      }
      return [...this.value];
    },
    set(issues: Dto.Issue[]) {
      this.value = issues;
      return [...this.value];
    },
    clear() {
      this.value = [];
      return [];
    },
    async fetch() {
      // if (this.value[0]) {
      //   return [...this.value];
      // }
      const response = (await useQuery("findManyIssue")) as Dto.Issue[];

      return this.set(response);
    },
  },
});
