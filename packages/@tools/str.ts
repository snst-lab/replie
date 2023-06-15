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
}
