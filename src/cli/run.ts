import { exit } from "process";
import basicFlakyTestDetector from "../flakyTestDetectors/basic";
import junit from "../parsers/junit/junit";
import { getOptions } from "./getOptions";
import validateOptions, {
  SUPPORTED_TEST_OUTPUT_FORMATS,
} from "./validateOptions";
import detectFlakyTests from "../core/detectFlakyTests";
import commandFactory from "../commandFactory";
import BasicReporter from "../reporters/basic";
import { ReportParser } from "../types";
import cucumberJson from "../parsers/cucumberJson/cucumberJson";

export default function run() {
  const options = getOptions();
  const validationErrors = validateOptions(options);
  if (validationErrors !== null) {
    console.error(validationErrors);
    exit(1);
  }

  const reporter = new BasicReporter(console);
  detectFlakyTests(
    options,
    commandFactory,
    getReportParser(options.testOutputFormat),
    basicFlakyTestDetector,
    reporter
  )
    .then(() => exit(0))
    .catch(() => {
      exit(parseInt(options.exitCode));
    });
}

function getReportParser(testOutputFormat: string): ReportParser {
  switch (testOutputFormat) {
    case SUPPORTED_TEST_OUTPUT_FORMATS.JUNIT:
      return junit;
    case SUPPORTED_TEST_OUTPUT_FORMATS.CUCUMBER_JSON:
      return cucumberJson;
  }
  throw new Error("Invalid output format");
}
