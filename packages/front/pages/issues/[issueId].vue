<script setup lang="ts">
import { $dialog, $dto, $loading } from "@stores";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();
const { public: constants } = useRuntimeConfig();

const issueStatus = constants.mapper.issueStatus as Json;
const issueId = ref<Dto.Id>(route.params.issueId as Dto.Id);
const issue = ref<Dto.Issue>($dto().issue.init(issueId.value));

onMounted(async () => {
  issue.value = await $dto().issue.fetch(issueId.value);
});

const onEvent = {
  clickBack: () => {
    router.push(`/issues/`);
  },
  clickDelete: async () => {
    await $dialog().show("confirm", {
      message: "相談内容を削除しますか？",
      label: "削除",
      color: "negative",
      icon: "delete",
      action: async () => {
        $loading().show(false);
        await $dto().issue.delete(issueId.value);
        $dialog().hide("confirm");
        $dialog().show("complete", {
          title: "削除完了",
          message: "相談内容を削除しました。",
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
  clickReuse: async () => {
    const exist = $dto().request.get(issue.value.personId);
    if (exist.message || exist.direction || exist.limitLength) {
      await $dialog().show("confirm", {
        message:
          "同じ相手への編集中の相談があります。再相談を作成すると、編集中の相談が上書きされます。続行しますか？",
        label: "続行する",
        color: "warning",
        iconRight: "chevron_right",
        action: async () => {
          await $dto().request.reuse(issue.value);
          $dialog().hide("confirm");
          router.push(`/request/${issue.value.personId}`);
        },
      });
    } else {
      await $dto().request.reuse(issue.value);
      router.push(`/request/${issue.value.personId}`);
    }
  },
};
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center back>相談結果を見る</TextTitle>
    <Text label class="q-pb-sm q-px-md"
      >以下の相手への返信案とアドバイスです</Text
    >
    <CardPerson
      :id="issue.personId"
      :name="issue.personName"
      :avatar="issue.personAvatar"
      :relationship="issue.personRelationship"
    />
    <q-form class="q-px-md q-py-md">
      <q-badge
        :color="issueStatus[issue.status].color"
        rounded
        class="q-py-xs q-px-md"
      >
        {{ issueStatus[issue.status].text }}</q-badge
      >
      <div class="row items-center q-gutter-x-sm q-pt-sm">
        <q-icon name="calendar_month" />
        <small> 相談日時 </small>
        <small>
          {{ dayjs(issue.createdAt).format(`YYYY年MM月DD日(dd) HH時mm分`) }}
        </small>
      </div>
      <q-separator class="q-my-md" />
      <Text bold>相手の情報</Text>
      <div class="q-pt-md">
        <Text label>あなたと相手との関係</Text>
        <p>{{ issue.personRelationship }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>最近のつきあい</Text>
        <p>{{ issue.personRecentIntimacy }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>相手の性格</Text>
        <p>{{ issue.personCharacter }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>相手の近況</Text>
        <p>{{ issue.personRecentStatus }}</p>
      </div>
      <q-separator class="q-my-md" />
      <Text bold>相談内容</Text>
      <div class="q-pt-md">
        <Text label>相手からのメッセージ</Text>
        <p>{{ issue.requestMessage }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>伝えたい意向</Text>
        <p>{{ issue.requestDirection }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>文字数制限</Text>
        <p>
          {{
            issue.requestLimitLength
              ? issue.requestLimitLength + "文字"
              : "なし"
          }}
        </p>
      </div>
      <q-separator class="q-my-md" />
      <Text bold>ChatGPTからのアドバイス</Text>
      <div class="q-pt-md">
        <p>
          {{ issue.result }}
        </p>
      </div>
      <q-separator class="q-my-md" />
      <ListButton class="q-py-sm">
        <Button icon="chevron_left" color="grey" @click="onEvent.clickBack()"
          >相談結果の履歴へ戻る</Button
        >
        <Button
          v-if="issue.status !== 'pending'"
          icon="delete"
          color="negative"
          @click="onEvent.clickDelete()"
          >削除する</Button
        >
        <Button
          v-if="issue.status !== 'pending'"
          icon-right="send"
          color="info"
          @click="onEvent.clickReuse()"
          >結果を元に再相談する</Button
        >
      </ListButton>
    </q-form>
  </div>
</template>

<style lang="scss" scoped></style>
