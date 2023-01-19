import { exit } from "process";
import basicFlakyTestDetector from "../flakyTestDetectors/basic";
import junit from "../parsers/junit";
import { getOptions } from "./getOptions";
import validateOptions from "./validateOptions";
import detectFlakyTests from "../core/detectFlakyTests";
import commandFactory from "../commandFactory";
import BasicReporter from "../reporters/basic";

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
    junit,
    basicFlakyTestDetector,
    reporter
  )
    .then(() => exit(0))
    .catch(() => {
      exit(parseInt(options.exitCode));
    });
}
