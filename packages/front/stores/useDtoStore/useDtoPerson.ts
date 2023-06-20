import { $dto } from "@stores";
import { defineStore } from "pinia";

const primitive = {
  id: "",
  name: "",
  relationship: "",
  avatar: "",
  character: "",
  recentStatus: "",
  recentIntimacy: "",
} satisfies Dto.Person;

export const useDtoPersonStore = defineStore("dtoPerson", {
  state: () => ({ value: {} as Record<Dto.Id, Dto.Person> }),
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
      if (!this.value[personId]?.name) {
        this.value[personId] = { ...primitive };
      }
      return { ...this.value[personId] };
    },
    set(personId: Dto.Id, person: Partial<Dto.Person>) {
      this.value[personId] = { ...this.value[personId], ...person };
      $dto().personList.set(personId, this.value[personId]);
    },
    clear(personId: Dto.Id) {
      this.value[personId] = { ...primitive };
      $dto().personList.clear(personId);
    },
    async fetch(personId: Dto.Id) {
      if (this.value[personId]?.name) {
        return { ...this.value[personId] };
      }
      if (personId === "create") {
        return { ...primitive };
      }
      const response = (await useQuery("findPerson", {
        where: { id: { equals: personId } },
      })) as Dto.Person;
      if (!response?.id) {
        return { ...primitive };
      }
      await this.set(response.id, response);
      return { ...this.value[personId] };
    },
    async update(personId: Dto.Id, person: Dto.Person) {
      const response = (await useMutation("upsertPerson", {
        data: { ...person, id: personId },
      })) as Dto.Person;
      if (!response?.id) {
        return { ...primitive };
      }
      await this.set(response.id, response);
      return { ...this.value[personId] };
    },
  },
});
