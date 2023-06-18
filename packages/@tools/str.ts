export class ToolsStr {
  slice(
    srcString: string,
    fromPattern: string,
    toPattern: string,
    offset: number = 0
  ) {
    const result: string[] = [];
    const length = srcString.length;

    let currentIndex = offset;
    while (currentIndex < length) {
      const fromIndex = srcString.indexOf(fromPattern, currentIndex);
      const toIndex = srcString.indexOf(toPattern, fromIndex);
      if (fromIndex < 0 || toIndex < 0) {
        break;
      }
      result.push(srcString.slice(fromIndex + fromPattern.length, toIndex));
      currentIndex = toIndex;
    }
    return result;
  }
  removeEmoji(srcString: string) {
    srcString.replace(
      /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]|[\uD83C][\uDF00-\uDFFF]|[\uD83D][\uDC00-\uDE4F]/g,
      ""
    );
    srcString = [...srcString]
      .filter((char) => char.charCodeAt(0) <= 65535)
      .join("");
    return srcString;
  }
}
