import BasicReporter from "../reporters/basic";
import serial from "../testExecutors/serial";
import {
  CommandFactory,
  FlakyTestDetector,
  Options,
  Reporter,
  ReportParser,
} from "../types";

export default async function detectFlakyTests(
  options: Options,
  commandFactory: CommandFactory,
  reportParser: ReportParser,
  flakyTestDetector: FlakyTestDetector,
  reporter: Reporter
): Promise<void> {
  const command = commandFactory(options, reportParser);
  const tests = await serial(command, parseInt(options.repeat), reporter);
  const flakyTests = flakyTestDetector(tests);

  reporter.flakyTestsFound(flakyTests);
  if (flakyTests.length > 0) throw new Error("Flaky tests found");
}
