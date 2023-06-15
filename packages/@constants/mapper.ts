export default {
  issueStatus: {
    pending: {
      text: "相談中",
      color: "warning",
    },
    done: {
      text: "回答済み",
      color: "info",
    },
    failed: {
      text: "失敗",
      color: "negative",
    },
    canceled: {
      text: "キャンセル",
      color: "negative",
    },
    deleted: {
      text: "削除済み",
      color: "negative",
    },
  } satisfies Record<Dto.Issue["status"], { text: string; color: string }>,
};
