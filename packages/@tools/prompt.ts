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
    const direction = requestDirection ? `私は${requestDirection}です。` : "";
    const relationship = personRelationship
      ? `[私と相手の関係]${personRelationship}`
      : "";
    const recentIntimacy = personRecentIntimacy
      ? `[直近のつきあい]${personRecentIntimacy}`
      : "";
    const character = personCharacter ? `[相手の性格]${personCharacter}` : "";
    const recentStatus = personRecentStatus
      ? `[相手の近況]${personRecentStatus}`
      : "";
    const limitLength = requestLimitLength
      ? `返信文は${requestLimitLength}文字以内で作りたいです。`
      : "";
    const message = requestMessage
      ? `[相手からのメッセージ]${requestMessage}`
      : "";
    return `あなたはリプリーというカウンセラーです。私は相手から以下のメッセージを受けとりました。${direction}以下の情報から、返信文の案とアドバイスをください。${limitLength}情報が不足する場合も、１度で必ず答えてほしいです。${relationship}${recentIntimacy}${character}${recentStatus}${message}`;
  };
}
