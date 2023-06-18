import { $dialog, $dto, $loading, $store } from "@stores";
<script setup lang="ts">
import { $dialog, $dto, $loading, $notification } from "@stores";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();

const personId = ref<Dto.Id>(route.params.personId as string);
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
  clickCard: (personId: string) => {
    router.push(`/persons/${personId}/`);
  },
  clickBack: (personId: string) => {
    router.push(`/request/${personId}/`);
  },
  clickNext: async (personId: string) => {
    await $dialog().show("confirm", {
      message: "相談内容を送信しますか？",
      label: "送信",
      iconRight: "send",
      action: async () => {
        $loading().show(false);
        await $dto().request.send(personId);
        $dto().request.clear(personId);
        $notification().pollingStart();
        $dialog().hide("confirm");
        $dialog().show("complete", {
          title: "相談をリクエストしました。",
          message:
            "相談結果の作成には数分時間がかかります。結果が出たら、アプリ内で通知します。",
          buttons: [
            {
              label: "相談結果の一覧へ",
              color: "grey",
              action: () => {
                $dialog().hide("complete");
              },
            },
          ],
          onHide: () => {
            router.push(`/issues/`);
          },
        });
      },
    });
  },
};
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center :back="`/request/${personId}`">確認画面</TextTitle>
    <p class="q-pb-sm q-px-md">
      以下の内容でAIに相談します。よろしければ「相談内容を送信する」ボタンを押してください。
    </p>
    <Text label class="q-px-md q-pb-xs">返信先の相手</Text>
    <CardPerson
      :id="person.id"
      :name="person.name"
      :avatar="person.avatar"
      :relationship="person.relationship"
      @click="onEvent.clickCard(personId)"
    />
    <q-form class="q-px-md q-py-md">
      <Text check bold>相手の情報</Text>
      <div class="q-pt-md">
        <Text label>あなたとの関係</Text>
        <p>{{ person.relationship }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>最近のつきあい</Text>
        <p>{{ person.recentIntimacy || "指定なし" }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>相手の性格</Text>
        <p>{{ person.character || "指定なし" }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>相手の近況</Text>
        <p>{{ person.recentStatus || "指定なし" }}</p>
      </div>

      <q-separator class="q-my-md" />
      <Text check bold>相手とのやりとり</Text>
      <div class="q-pt-md">
        <Text label>相手からのメッセージ</Text>
        <p>
          {{ request.message }}
        </p>
      </div>
      <div class="q-pt-md">
        <Text label>返信文の方向性</Text>
        <p>{{ request.direction || "指定なし" }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>返信文の文字数制限</Text>
        <p>
          {{
            request.limitLength
              ? `${request.limitLength?.toLocaleString()}文字`
              : "指定なし"
          }}
        </p>
      </div>
      <q-separator class="q-my-md" />
      <ListButton class="q-py-sm">
        <Button
          icon="chevron_left"
          color="grey"
          @click="onEvent.clickBack(personId)"
          >入力画面に戻る</Button
        >
        <Button
          icon-right="send"
          color="info"
          @click="onEvent.clickNext(personId)"
          >相談内容を送信する</Button
        >
      </ListButton>
    </q-form>
  </div>
</template>

<style lang="scss" scoped></style>
