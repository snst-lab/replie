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
      ? `返信文の文字数制限は${requestLimitLength}文字です。`
      : "返信文は200文字程度でお願いします。";
    const message = requestMessage
      ? `[相手からのメッセージ]${requestMessage}`
      : "";
    return `あなたはリプリーというカウンセラーです。私は相手から以下のメッセージをもらいました。${direction}各状況を踏まえ、返信文の案とアドバイスをください。${limitLength}似た質問が続きますが必ず回答下さい。${relationship}${recentIntimacy}${character}${recentStatus}${message}`;
  };
}
