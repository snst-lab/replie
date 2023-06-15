import "assets/js/blockies";
import { tools } from "@tools";

export function useBlockies(seed?: string) {
  return blockies
    .create({
      seed: seed ?? tools.random.string(),
      size: 8,
      scale: 8,
    })
    .toDataURL();
}
