// @ts-ignore
import css from "@/assets/css/index.scss?inline";
import { tools } from "@tools";

export function useScssVars(): Record<string, string> {
  const cssArray = tools.str.slice(css, ":export {", "}", 0);
  const result = {} as Record<string, any>;
  for (let e of cssArray) {
    e = e.replaceAll("\n", "").replaceAll(" ", "");
    const attrArray = e.split(";");
    for (const f of attrArray) {
      const attr = f.split(":");
      if (/px/.test(attr[1])) {
        attr[1] = attr[1].replace("px", "");
      }
      if (!!Number(attr[1])) {
        result[attr[0]] = Number(attr[1]);
      } else {
        result[attr[0]] = attr[1];
      }
    }
  }
  return result;
}
