import { ArrayMultimap } from '@teppeis/multimaps'
import { FlakyTestDetector, Status, Test, TestExecution } from '../types'

const basic: FlakyTestDetector = (testExecutions) => {
  const statusesByJsonTests = groupStatusesByJsonTest(testExecutions)
  const flakyTests: Test[] = []

  for (const jsonTest of statusesByJsonTests.keys()) {
    const statuses = statusesByJsonTests.get(jsonTest)
    if (uniq(statuses).length > 1) {
      flakyTests.push(JSON.parse(jsonTest))
    }
  }
  return flakyTests
}

function groupStatusesByJsonTest(testExecutions: ReadonlyArray<TestExecution>) {
  const statusesByTest = new ArrayMultimap<string, Status>()
  for (const testExecution of testExecutions) {
    statusesByTest.put(JSON.stringify(testExecution.test), testExecution.status)
  }
  return statusesByTest
}

function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

export default basic
