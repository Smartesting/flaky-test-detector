import { Options } from "../types";

export enum OptionsValidationError {
  MissingRuntests = "Missing option --run-tests",
  MissingTestOutputFile = "Missing option --test-output-file",
  MissingRepeat = "Missing option --repeat",
  InvalidRepeat = "--repeat is not a valid integer",
  MissingExitCode = "Missing option --exit-code",
  InvalidExitCode = "--exit-code is not a valid integer",
}

export default function validateOptions(
  options: Partial<Options>
): OptionsValidationError | null {
  if (!options.runTests) return OptionsValidationError.MissingRuntests;
  if (!options.testOutputFile)
    return OptionsValidationError.MissingTestOutputFile;
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
