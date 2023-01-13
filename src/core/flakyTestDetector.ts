import executeTests from "../executeTests";
import {
  CommandFactory,
  FlakyTestDetector,
  Options,
  ReportParser,
} from "../types";

export default async function flakyTestDetector(
  options: Options,
  commandFactory: CommandFactory,
  reportParser: ReportParser,
  flakyTestDetector: FlakyTestDetector
): Promise<ReadonlyArray<string>> {
  const command = commandFactory(options, reportParser);
  const tests = await executeTests(command, parseInt(options.repeat));
  return flakyTestDetector(tests);
}
