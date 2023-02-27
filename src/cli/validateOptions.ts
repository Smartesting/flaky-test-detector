import { Options } from "../types";

export enum SUPPORTED_TEST_OUTPUT_FORMATS {
  JUNIT = "junit",
  CUCUMBER_JSON = "cucumberJson",
}

export enum OptionsValidationError {
  MissingRuntests = "Missing option --run-tests",
  MissingTestOutputFile = "Missing option --test-output-file",
  MissingTestOutputFormat = "Missing option --test-output-format",
  MissingRepeat = "Missing option --repeat",
  InvalidRepeat = "--repeat is not a valid integer",
  MissingExitCode = "Missing option --exit-code",
  InvalidExitCode = "--exit-code is not a valid integer",
  InvalidTestOutputFormat = "--test-output-format is not a valid format. Should be junit or cucumberJson",
}

export default function validateOptions(
  options: Partial<Options>
): OptionsValidationError | null {
  if (!options.runTests) return OptionsValidationError.MissingRuntests;
  if (!options.testOutputFile)
    return OptionsValidationError.MissingTestOutputFile;
  if (!options.testOutputFormat)
    return OptionsValidationError.MissingTestOutputFormat;
  if (!validateOutputFormat(options.testOutputFormat))
    return OptionsValidationError.InvalidTestOutputFormat;
  if (!options.repeat) return OptionsValidationError.MissingRepeat;
  if (!validateInteger(options.repeat))
    return OptionsValidationError.InvalidRepeat;
  if (!options.exitCode) return OptionsValidationError.MissingExitCode;
  if (!validateInteger(options.exitCode))
    return OptionsValidationError.InvalidExitCode;

  return null;
}

function validateInteger(value: string): boolean {
  const toInt = parseInt(value);
  return !isNaN(toInt) && value === toInt.toString();
}

function validateOutputFormat(value: string): boolean {
  return Object.values(SUPPORTED_TEST_OUTPUT_FORMATS)
    .map(String)
    .includes(value);
}
