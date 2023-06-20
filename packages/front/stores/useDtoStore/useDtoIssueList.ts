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
    newestTimestamp(state) {
      return state.value[0]?.createdAt ?? null;
    },
    oldestTimestamp(state) {
      return state.value[state.value.length - 1]?.createdAt ?? null;
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
    set(issueId: Dto.Id, issue: Dto.Issue) {
      const index = this.value.findIndex((e) => e.id === issueId);
      if (index === -1) {
        this.value.push(issue);
      } else {
        this.value[index] = issue;
      }
    },
    clear(issueId: Dto.Id) {
      const index = this.value.findIndex((e) => e.id === issueId);
      if (index !== -1) {
        this.value.splice(index, 1);
      }
    },
    setAll(issues: Dto.Issue[]) {
      this.value = [...issues];
    },
    clearAll() {
      this.value = [];
    },
    unshift(issues: Dto.Issue[]) {
      this.value.unshift(...issues);
    },
    push(issues: Dto.Issue[]) {
      this.value.push(...issues);
    },
    async fetchNew() {
      const response = (await useQuery(
        "findManyIssue",
        this.value[0]
          ? {
              where: { createdAt: { gt: this.newestTimestamp } },
            }
          : {}
      )) as Dto.Issue[];
      if (response[0]) {
        await this.unshift(response);
      }
      return [...this.value];
    },
    async fetchPast() {
      const { public: constants } = useRuntimeConfig();
      const { issuesPerPage } = constants.number;
      if (this.value.length < issuesPerPage) {
        return [];
      }
      const response = (await useQuery("findManyIssue", {
        where: { createdAt: { lt: this.oldestTimestamp } },
      })) as Dto.Issue[];
      if (response[0]) {
        await this.push(response);
      } else {
        window.scrollBy({
          top: -(1 / issuesPerPage) * window.innerHeight,
          behavior: "smooth",
        });
      }
      return [...this.value];
    },
  },
});
