import { TestExecution, TestExecutor } from '../types'

const serial: TestExecutor = async (command, repeat, reporter) => {
  const tests: TestExecution[] = []
  for (let executionIndex = 0; executionIndex < repeat; executionIndex++) {
    try {
      await reporter.testSuiteStarted(executionIndex)
      const executed = await command()
      await reporter.testSuiteEnded(
        executionIndex,
        executed.map((testExecution) => testExecution.status)
      )
      tests.push(...executed)
    } catch (err) {
      // TODO: is there anything to do here ?
    }
  }
  return tests
}

export default serial
