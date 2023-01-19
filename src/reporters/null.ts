import { Reporter } from "../types";

export default class NullReporter implements Reporter {
  async testSuiteStarted() {}
  async testSuiteEnded() {}
  async flakyTestsFound() {}
}
