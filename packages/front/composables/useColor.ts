import { tools } from "@tools";
import { colors } from "quasar";

const colorList = [
  "primary",
  "secondary",
  "accent",
  "dark",
  "positive",
  "negative",
  "info",
  "warning",
];

export function useColor(colorName?: string, seed?: string) {
  if (colorName !== "random") {
    return colors.getPaletteColor(colorName ?? "");
  } else {
    const index = seed
      ? tools.random.guidToInt(seed) % (colorList.length - 1)
      : tools.random.integer(0, colorList.length - 1);
    return colors.getPaletteColor(colorList[index]);
  }
}
