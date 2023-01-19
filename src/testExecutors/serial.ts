import { Command, Test, TestExecutor } from "../types";

const serial: TestExecutor = async (command, repeat, reporter) => {
  const tests: Test[] = [];
  for (let executionIndex = 0; executionIndex < repeat; executionIndex++) {
    try {
      await reporter.testSuiteStarted(executionIndex);
      const executed = await command();
      await reporter.testSuiteEnded(executionIndex);
      tests.push(...executed);
    } catch (err) {
      // TODO: is there anything to do here ?
    }
  }
  return tests;
};

export default serial;
