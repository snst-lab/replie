<script setup lang="ts">
import { VNodeRef } from "vue";
import { $dto } from "@stores";
import { tools } from "@tools";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();

const form = ref<VNodeRef>({} as VNodeRef);
const personId = ref<Dto.Id>(route.params.personId as Dto.Id);
const person = ref<Dto.Person>($dto().person.init(personId.value));
const request = ref<Dto.Request>($dto().request.init(personId.value));

onMounted(async () => {
  if (!personId.value) {
    router.replace("/persons/");
  }
  person.value = await $dto().person.fetch(personId.value);
  request.value = await $dto().request.get(personId.value);
});

const onEvent = {
  clickPerson: (personId: string) => {
    router.push(`/persons/${personId}/`);
  },
  clickNext: async (personId: string) => {
    await useValidate(form);
    router.push(`/request/${personId}/confirm/`);
  },
  blur: async () => {
    await form.value.validate();
  },
};

watch(
  [
    () => request.value.message,
    () => request.value.direction,
    () => request.value.limitLength,
  ],
  async (value) => {
    $dto().request.set(personId.value, {
      message: value[0],
      direction: value[1],
      limitLength: value[2],
    });
  }
);
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center back="/persons/">メッセージを入力</TextTitle>
    <p class="q-pb-sm q-px-md">
      相手からのメッセージを貼り付け、あなたの意向を入力し、「確認画面へ」ボタンを押してください。
    </p>
    <Text label class="q-px-md q-py-xs"
      >返事をする相手（クリックすると相手の情報を編集できます）</Text
    >
    <CardPerson
      :id="person.id"
      :name="person.name"
      :avatar="person.avatar"
      :relationship="person.relationship"
      @click="onEvent.clickPerson(person.id)"
      icon="mode_edit"
    />
    <q-form class="q-px-md q-pt-sm" ref="form" lazy-validation>
      <Input
        :key="request.message + request.direction + request.limitLength"
        :value="$dto().prompt.value(personId).length.toLocaleString()"
        label="ChatGPTへの命令文文字数"
        unit="文字 / 2,000文字"
        type="static"
        :rules="[(val: string) => Number(val) <= 2000 ||
      '文字数制限を超えています']"
      />
      <Input
        :key="person.id"
        v-model:value="request.message"
        label="相手からのメッセージ"
        must
        type="textarea"
        :rows="8"
        class="q-mb-md"
        @blur="onEvent.blur"
      />
      <label>返事の意向（省略可）</label>
      <Input
        :key="person.id"
        v-model:value="request.direction"
        label="わたしは"
        :candidates="[
          '相手を元気づけたい',
          '断りたい',
          '相手と良好な関係を保ちたい',
        ]"
        :rules="[ (val: string) => val.length <= 50 ||
      '50文字以内で入力してください']"
        class="q-mt-sm"
        @blur="onEvent.blur"
      />
      <label>です</label>
      <Input
        type="number"
        :key="person.id"
        v-model:value="request.limitLength"
        label="返信文の文字数制限（省略可）"
        :candidates="[50, 100, 140, 200, 300, 500]"
        :rules="[
           (val: number) => val >= 0 ||'マイナス値は指定できません',
           (val: number) => val <= 500 ||'文字数制限は500字以内で設定してください']"
        class="q-mt-sm"
        @blur="onEvent.blur"
      />
      <ListButton class="q-py-sm">
        <Button
          icon-right="chevron_right"
          color="info"
          @click="onEvent.clickNext(personId)"
          >確認画面へ</Button
        >
      </ListButton>
    </q-form>
  </div>
</template>

<style lang="scss" scoped></style>
