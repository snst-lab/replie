<script setup lang="ts">
import { VNodeRef } from "vue";
import { $dialog, $dto, $loading } from "@stores";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();

const form = ref<VNodeRef>({} as VNodeRef);

const type = ref<string>((route.query.type as string) ?? "other");
const personId = ref<Dto.Id>((route.params.personId as Dto.Id) ?? "create");
const person = ref<Dto.Person>($dto().person.init(personId.value));
const isCreate = ref<boolean>(personId.value === "create");
const isEnableLeave = ref<boolean>(true);

onMounted(async () => {
  if (!personId.value) {
    router.replace(`/persons/`);
  }
  person.value = await $dto().person.fetch(personId.value);
});

onBeforeRouteLeave(async (to, from) => {
  if (!isEnableLeave.value && !isCreate.value) {
    await $dialog().show("confirm", {
      label: "編集を中止",
      message: "編集を中止してもよろしいですか？変更内容は破棄されます。",
      action: () => {
        isEnableLeave.value = true;
        router.push(to);
      },
    });
    return isEnableLeave.value;
  } else {
    return true;
  }
});

watch(
  [
    () => person.value.name,
    () => person.value.relationship,
    () => person.value.character,
    () => person.value.recentIntimacy,
    () => person.value.recentStatus,
  ],
  (value) => {
    if (isCreate.value) {
      $dto().person.set(personId.value, {
        id: personId.value,
        avatar: "",
        name: value[0],
        relationship: value[1],
        character: value[2],
        recentIntimacy: value[3],
        recentStatus: value[4],
      });
    }
    isEnableLeave.value = false;
  }
);

const onEvent = {
  clickNext: async (personId: string) => {
    await useValidate(form);

    $dialog().show("confirm", {
      label: isCreate.value ? "登録する" : "更新する",
      message: isCreate.value
        ? "現在の内容で登録します。よろしいですか？"
        : "現在の内容で更新します。よろしいですか？",
      action: async () => {
        $loading().show(false);
        const response = await $dto().person.update(personId, person.value);
        if (isCreate.value) {
          $dto().person.clear("create");
          person.value = $dto().person.primitive;
        }
        $dialog().hide("confirm");
        $dialog().show("complete", {
          title: isCreate.value ? "登録完了" : "更新完了",
          message: isCreate.value
            ? "相手の情報の登録が完了しました"
            : "相手の情報の更新が完了しました。",
          buttons: [
            {
              label: "相手の一覧へ",
              color: "grey",
              action: () => {
                $dialog().hide("complete");
                isEnableLeave.value = true;
                router.push(`/persons/`);
              },
            },
            {
              label: "この相手への返信文を考える",
              color: "info",
              iconRight: "chevron_right",
              action: () => {
                $dialog().hide("complete");
                isEnableLeave.value = true;
                personId = response.id;
                router.push(`/request/${personId}/`);
              },
            },
          ],
        });
      },
    });
  },
};
</script>

<template>
  <div class="q-pb-xl">
    <template v-if="isCreate">
      <TextTitle center back>相手の情報を登録する</TextTitle>
      <p class="q-pb-sm q-px-md">
        以下に返信をしたい相手の情報を入力してください。<br />入力内容は後から変更できます。<br />空白のままでも登録できますが、入力することでより実情にあったアドバイスができるようになります。
      </p>
    </template>
    <template v-else>
      <TextTitle center :back="`/request/${personId}/`"
        >相手の情報を編集する</TextTitle
      >
      <p class="q-pb-sm q-px-md">以下の相手の情報を編集できます</p>
      <CardPerson
        :id="person.id"
        :name="person.name"
        :avatar="person.avatar"
        :relationship="person.relationship"
      />
    </template>
    <q-form class="q-px-md q-pt-md" ref="form" lazy-validation>
      <Input
        v-model:value="person.name"
        :key="person.id"
        label="相手の名前"
        must
        :rules="[ (val: string) => val.length <= 50 ||
      '50文字以内で入力してください']"
        class="q-mb-md"
      />
      <label>あなたと相手との関係を教えてください</label>
      <Input
        v-model:value="person.relationship"
        :key="person.id"
        label="私から見て相手は"
        :candidates="[
          '友だち',
          '先輩',
          '後輩',
          '家族',
          '親戚',
          '取引先',
          '他人',
        ]"
        unit="です"
        must
        :rules="[ (val: string) => val.length <= 50 ||
      '50文字以内で入力してください']"
        class="q-mb-md"
      />
      <label>最近のつきあいについて教えてください（省略可）</label>
      <Input
        v-model:value="person.recentIntimacy"
        :key="person.id"
        :label="`私と相手は最近`"
        :candidates="['良好な関係', '険悪な雰囲気', '疎遠']"
        unit="です"
        :rules="[ (val: string) => val.length <= 50 ||
      '50文字以内で入力してください']"
        class="q-mb-md"
      />
      <label>相手の性格について教えてください（省略可）</label>
      <Input
        v-model:value="person.character"
        :key="person.id"
        :label="`相手は`"
        :candidates="['優しい', '勝ち気な', '神経質な']"
        unit="性格です"
        :rules="[ (val: string) => val.length <= 50 ||
      '50文字以内で入力してください']"
        class="q-mb-md"
      />
      <label>相手の近況について教えてください（省略可）</label>
      <Input
        v-model:value="person.recentStatus"
        :key="person.id"
        :label="`相手は最近`"
        :candidates="['元気そう', '忙しそう', '病気がち']"
        unit="です"
        :rules="[ (val: string) => val.length <= 50 ||
      '50文字以内で入力してください']"
        class="q-mb-md"
      />

      <ListButton class="q-py-sm">
        <Button
          icon-right="chevron_right"
          color="info"
          @click="onEvent.clickNext(personId)"
          >{{ isCreate ? "登録する" : "更新する" }}</Button
        >
      </ListButton>
    </q-form>
  </div>
</template>

<style lang="scss" scoped></style>
