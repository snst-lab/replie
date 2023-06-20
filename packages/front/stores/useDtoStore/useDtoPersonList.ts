import { defineStore } from "pinia";

export const useDtoPersonListStore = defineStore("dtoPersonList", {
  state: () => ({ value: [] as Dto.Person[] }),
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
    set(personId: Dto.Id, person: Dto.Person) {
      const index = this.value.findIndex((e) => e.id === personId);
      if (index === -1) {
        this.value.push(person);
      } else {
        this.value[index] = person;
      }
      return [...this.value];
    },
    clear(personId: Dto.Id) {
      const index = this.value.findIndex((e) => e.id === personId);
      if (index !== -1) {
        this.value.splice(index, 1);
      }
      return [...this.value];
    },
    setAll(persons: Dto.Person[]) {
      this.value = [...persons];
    },
    clearAll() {
      this.value = [];
      return [];
    },
    async fetch() {
      if (this.value[0]) {
        return [...this.value];
      }
      const response = (await useQuery("findManyPerson")) as Dto.Person[];
      if (response[0]) {
        await this.setAll(response);
      }
      return [...this.value];
    },
  },
});
