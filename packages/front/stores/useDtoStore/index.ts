import { useDtoRequestStore } from "./useDtoRequest";
import { useDtoPersonStore } from "./useDtoPerson";
import { useDtoPersonListStore } from "./useDtoPersonList";
import { useDtoIssueListStore } from "./useDtoIssueList";
import { useDtoIssueStore } from "./useDtoIssue";
import { useDtoPromptStore } from "./useDtoPrompt";

export const $dto = () => {
  const person = useDtoPersonStore();
  const personList = useDtoPersonListStore();
  const request = useDtoRequestStore();
  const issue = useDtoIssueStore();
  const issueList = useDtoIssueListStore();
  const prompt = useDtoPromptStore();

  return {
    person,
    personList,
    request,
    issue,
    issueList,
    prompt,
  };
};
