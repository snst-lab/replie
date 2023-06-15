<script setup lang="ts">
import { $dto } from "@stores";
definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();
const { public: constants } = useRuntimeConfig();

const issueStatus = constants.mapper.issueStatus as Json;
const issueId = ref<Dto.Id>(route.params.issueId as Dto.Id);
const issue = ref<Dto.Issue>($dto().issue.init(issueId.value));
const person = ref<Dto.Person>($dto().person.init(issue.value.personId));

onMounted(async () => {
  issue.value = await $dto().issue.fetch(issueId.value);
  person.value = await $dto().person.fetch(issue.value.personId);
});

const onEvent = {
  clickCard: (personId: string) => {},
  clickBack: () => {
    router.push(`/issues/`);
  },
  clickNext: async (personId: string) => {},
};
</script>

<template>
  <div class="q-pb-xl">
    <TextTitle center back>相談結果を見る</TextTitle>
    <Text label class="q-pb-sm q-px-md">以下の相手への返事の相談結果です</Text>
    <CardPerson
      :id="issue.personId"
      :name="person.name"
      :avatar="person.avatar"
      :relationship="issue.personRelationship"
      @click="onEvent.clickCard(issue.personId)"
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
        <Text label>あなたとの関係</Text>
        <p>{{ issue.personRelationship }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>性格</Text>
        <p>{{ issue.personCharacter }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>相手の近況</Text>
        <p>{{ issue.personRecentStatus }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>最近の相手との関係性</Text>
        <p>{{ issue.personRecentIntimacy }}</p>
      </div>
      <q-separator class="q-my-md" />
      <Text bold>相手とのやりとり</Text>
      <div class="q-pt-md">
        <Text label>相手からのメッセージ</Text>
        <p>{{ issue.requestMessage }}</p>
      </div>
      <div class="q-pt-md">
        <Text label>返事の意向</Text>
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
      <Text bold>リプリーからのアドバイス</Text>
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
      </ListButton>
    </q-form>
  </div>
</template>

<style lang="scss" scoped></style>