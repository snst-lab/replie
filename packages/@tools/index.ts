import { ToolsRandom } from "./random";
import { ToolsStr } from "./str";
import { ToolsPrompt } from "./prompt";

export const tools = {
  sleep: (delay: number = 0, callback?: () => void) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(callback);
      }, delay);
    });
  },
  wait: (condition: boolean, callback: () => void, fallback?: () => void) => {
    const interval = setInterval(() => {
      if (condition) {
        clearInterval(interval);
        callback();
      }
    }, 500);
    setTimeout(() => {
      clearInterval(interval);
      fallback?.();
    }, 5000);
  },
  random: new ToolsRandom(),
  str: new ToolsStr(),
  prompt: new ToolsPrompt(),
};
