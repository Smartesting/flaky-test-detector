import { Test } from "./types";

export default async function executeTests(
  command: () => Promise<ReadonlyArray<Test>>,
  repeat: number
): Promise<ReadonlyArray<Test>> {
  const tests: Test[] = [];
  for (let executionIndex = 0; executionIndex < repeat; executionIndex++) {
    try {
      const executed = await command();
      tests.push(...executed);
    } catch (err) {
      // TODO: is there anything to do here ?
    }
  }
  return tests;
}
