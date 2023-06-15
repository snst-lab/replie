import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { execSync } from "child_process";

describe("Deploy", async () => {
  await beforeEach(async ({ meta }) => {
    console.log(`==== ${meta.name} ====`);
  });

  await test("Deploy contracts", async () => {
    execSync("yarn hardhat deploy --type token --name Token");
  });
});
