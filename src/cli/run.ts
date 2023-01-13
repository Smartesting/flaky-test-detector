import { exit } from "process";
import basic from "../flakyTestDetectors/basic";
import junit from "../parsers/junit";
import { getOptions } from "./getOptions";
import validateOptions from "./validateOptions";
import flakyTestDetector from "../core/flakyTestDetector";
import commandFactory from "../commandFactory";

export default function run() {
  const options = getOptions();
  const validationErrors = validateOptions(options);
  if (validationErrors !== null) {
    console.error(validationErrors);
    exit(1);
  }

  flakyTestDetector(options, commandFactory, junit, basic).then(
    (flakyTests) => {
      const flakytestsCount = flakyTests.length;
      if (flakytestsCount === 0) {
        exit(0);
      } else {
        console.log(`Found ${flakytestsCount} flaky tests`);
        console.log(flakyTests.map((testName) => ` - ${testName}`).join("\n"));
        exit(1);
      }
    }
  );
}
