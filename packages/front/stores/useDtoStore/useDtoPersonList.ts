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
    setOne(personId: Dto.Id, person: Dto.Person) {
      const index = this.value.findIndex((e) => e.id === personId);
      if (index === -1) {
        this.value.push(person);
      } else {
        this.value[index] = person;
      }
      return [...this.value];
    },
    clearOne(personId: Dto.Id) {
      const index = this.value.findIndex((e) => e.id === personId);
      if (index !== -1) {
        this.value.splice(index, 1);
      }
      return [...this.value];
    },
    set(persons: Dto.Person[]) {
      this.value = persons;
      return [...this.value];
    },
    clear() {
      this.value = [];
      return [];
    },
    async fetch() {
      if (this.value[0]) {
        return [...this.value];
      }
      // const response = await [
      //   {
      //     id: "000000000001",
      //     avatar: "",
      //     name: "田中 花子",
      //     relationship: "友だち",
      //   },
      //   {
      //     id: "000000000002",
      //     avatar: "",
      //     name: "山田 聡太郎",
      //     relationship: "取引先",
      //   },
      //   {
      //     id: "000000000003",
      //     avatar: "",
      //     name: "佐藤 恵美子",
      //     relationship: "後輩",
      //   },
      //   {
      //     id: "000000000004",
      //     avatar: "",
      //     name: "鈴木 大輔",
      //     relationship: "同級生",
      //   },
      //   {
      //     id: "000000000005",
      //     avatar: "",
      //     name: "木村 翔太",
      //     relationship: "同僚",
      //   },
      //   {
      //     id: "000000000006",
      //     avatar: "",
      //     name: "宮田 真由美",
      //     relationship: "親戚",
      //   },
      // ];
      const response = (await useQuery("findManyPerson")) as Dto.Person[];
      return this.set(response ?? []);
    },
  },
});
