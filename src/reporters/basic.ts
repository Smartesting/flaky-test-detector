import { Logger, Reporter } from "../types";

export default class BasicReporter implements Reporter {
  constructor(private readonly logger: Logger) {}

  async testSuiteStarted(index: number) {
    this.logger.log(`Test suite #${index} started`);
  }

  async testSuiteEnded(index: number) {
    this.logger.log(`Test suite #${index} ended`);
  }

  async flakyTestsFound(flakyTests: ReadonlyArray<string>) {
    const flakytestsCount = flakyTests.length;
    if (flakytestsCount === 0) {
      this.logger.log("No flaky tests found");
      return;
    }

    this.logger.error(`Found ${flakytestsCount} flaky tests`);
    for (const flakyTest of flakyTests) {
      this.logger.error(` - ${flakyTest}`);
    }
  }
}
