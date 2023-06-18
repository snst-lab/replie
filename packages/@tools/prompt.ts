export class ToolsPrompt {
  issue = (
    personRelationship: string,
    personCharacter?: string,
    personRecentStatus?: string,
    personRecentIntimacy?: string,
    requestMessage?: string,
    requestDirection?: string,
    requestLimitLength?: number
  ) => {
    const relationship = personRelationship ? personRelationship : "ある相手";
    const limitLength = requestLimitLength
      ? `文案は${requestLimitLength}文字以内で作りたいです。`
      : "";
    const direction = requestDirection
      ? `私の意向として、私は${requestDirection}です。`
      : "";
    const recentIntimacy = personRecentIntimacy
      ? `私と相手は最近${personRecentIntimacy}です。`
      : "";
    const character = personCharacter
      ? `相手は${personCharacter}性格です。`
      : "";
    const recentStatus = personRecentStatus
      ? `相手は最近${personRecentStatus}です。`
      : "";
    // const other = requestOther ? `[補足情報]${requestOther}` : "";
    return `あなたはChatGPTカウンセラーです。私は${relationship}から以下のメッセージをもらったのですが、相手にどう返信したらよいか文案とアドバイスをください。${limitLength}${
      requestDirection ||
      personRecentIntimacy ||
      personCharacter ||
      personRecentStatus
        ? "ちなみに、"
        : ""
    }${direction}${recentIntimacy}${character}${recentStatus}文案作成のための情報が不足している場合は、補足情報が必要な旨教えてください。よろしくお願いします。\n${relationship}からのメッセージ「${requestMessage}」`;
  };
}
