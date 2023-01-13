import { Options } from "../types";

export enum OptionsValidationError {
  MissingRuntests = "Missing option --run-tests",
  MissingTestOutputFile = "Missing option --test-output-file",
  MissingRepeat = "Missing option --repeat",
  InvalidRepeat = "--repeat is not a valid integer",
}

export default function validateOptions(
  options: Partial<Options>
): OptionsValidationError | null {
  if (!options.runTests) return OptionsValidationError.MissingRuntests;
  if (!options.testOutputFile)
    return OptionsValidationError.MissingTestOutputFile;
  if (!options.repeat) return OptionsValidationError.MissingRepeat;

  const repeat = parseInt(options.repeat);
  if (isNaN(repeat) || options.repeat !== repeat.toString())
    return OptionsValidationError.InvalidRepeat;

  return null;
}
