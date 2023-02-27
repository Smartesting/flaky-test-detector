import { Logger, Reporter, Status, Test } from '../types'

export default class BasicReporter implements Reporter {
  constructor(private readonly logger: Logger) {}

  async testSuiteStarted(index: number) {
    this.logger.log(`Test suite #${index} started`)
  }

  async testSuiteEnded(index: number, statuses: ReadonlyArray<Status>) {
    const countByStatus = {
      [Status.PASSED]: 0,
      [Status.FAILED]: 0,
    }
    for (const status of statuses) {
      countByStatus[status] += 1
    }
    this.logger.log(
      `Test suite #${index} ended: ${countByStatus[Status.PASSED]} passed, ${
        countByStatus[Status.FAILED]
      } failed`
    )
  }

  async flakyTestsFound(flakyTests: ReadonlyArray<Test>) {
    const flakytestsCount = flakyTests.length
    if (flakytestsCount === 0) {
      this.logger.log('\nNo flaky tests found')
      return
    }

    this.logger.error(`\nFound ${flakytestsCount} flaky tests`)
    for (const flakyTest of flakyTests) {
      this.logger.error(` - ${flakyTest.name}`)
    }
  }
}
