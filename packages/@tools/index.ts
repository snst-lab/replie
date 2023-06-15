import { ToolsRandom } from "./random";
import { ToolsStr } from "./str";
import { ToolsPrompt } from "./prompt";

export const tools = {
  sleep: (delay: number = 0, callback?: () => {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(callback);
      }, delay);
    });
  },
  random: new ToolsRandom(),
  str: new ToolsStr(),
  prompt: new ToolsPrompt(),
};
