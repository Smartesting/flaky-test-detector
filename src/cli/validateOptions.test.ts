import assert from "assert";
import validateOptions, { OptionsValidationError } from "./validateOptions";

describe("validateOptions", () => {
  it("returns OptionsValidationError.MissingRuntests when `runTests` is not specified", () => {
    assert.strictEqual(
      validateOptions({}),
      OptionsValidationError.MissingRuntests
    );
  });

  it("returns OptionsValidationError.MissingTestOutputFile when `testOutputFile` is not specified", () => {
    assert.strictEqual(
      validateOptions({ runTests: "npm run tests" }),
      OptionsValidationError.MissingTestOutputFile
    );
  });

  it("returns OptionsValidationError.MissingRepeat when `repeat` is not present", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "junit",
      }),
      OptionsValidationError.MissingRepeat
    );
  });

  it("returns OptionsValidationError.InvalidRepeat when `repeat` is not a number", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "junit",
        repeat: "abcd",
      }),
      OptionsValidationError.InvalidRepeat
    );
  });

  it("returns OptionsValidationError.InvalidRepeat when `repeat` is not a integer", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "junit",
        repeat: "12.33",
      }),
      OptionsValidationError.InvalidRepeat
    );
  });

  it("returns OptionsValidationError.MissingExitCode when `exitCode` is not present", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "junit",
        repeat: "10",
      }),
      OptionsValidationError.MissingExitCode
    );
  });

  it("returns OptionsValidationError.InvalidExitCode when `exitCode` is not a number", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "junit",
        repeat: "10",
        exitCode: "exitcode",
      }),
      OptionsValidationError.InvalidExitCode
    );
  });

  it("returns OptionsValidationError.InvalidExitCode when `exitCode` is not a integer", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "junit",
        repeat: "10",
        exitCode: "3.14",
      }),
      OptionsValidationError.InvalidExitCode
    );
  });

  it("returns OptionsValidationError.MissingTestOutputFormat when `testOutputFormat` is not present", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        exitCode: "0",
        repeat: "10",
      }),
      OptionsValidationError.MissingTestOutputFormat
    );
  });

  it("returns OptionsValidationError.InvalidTestOutputFormat when `testOutputFormat` is not supported", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "polop",
        repeat: "10",
        exitCode: "0",
      }),
      OptionsValidationError.InvalidTestOutputFormat
    );
  });

  it("returns null when no error are found", () => {
    assert.strictEqual(
      validateOptions({
        runTests: "npm run tests",
        testOutputFile: "./test-results.xml",
        testOutputFormat: "junit",
        repeat: "12",
        exitCode: "1",
      }),
      null
    );
  });
});
