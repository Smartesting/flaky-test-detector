import assert from "assert";
import { Logger, Status, Test } from "../types";
import BasicReporter from "./basic";

describe("reporters", () => {
  describe("basic", () => {
    let logged: string[] = [];
    let errored: string[] = [];

    const logger: Logger = {
      log(message) {
        logged.push(`${message}`);
      },

      error(message) {
        errored.push(`${message}`);
      },
    };

    const reporter = new BasicReporter(logger);

    beforeEach(() => {
      logged = [];
      errored = [];
    });

    describe("testSuiteStarted", () => {
      it("logs a message about test starting", async () => {
        await reporter.testSuiteStarted(1);

        assert.deepStrictEqual(logged, ["Test suite #1 started"]);
      });
    });

    describe("testSuiteEnded", () => {
      it("logs a message about test starting", async () => {
        await reporter.testSuiteEnded(1, [
          Status.PASSED,
          Status.FAILED,
          Status.PASSED,
        ]);

        assert.deepStrictEqual(logged, [
          "Test suite #1 ended: 2 passed, 1 failed",
        ]);
      });
    });

    describe("flakyTestsFound", () => {
      context("when no flaky tests are found", () => {
        const flakyTests: Test[] = [];
        it("logs a message about flaky tests", async () => {
          await reporter.flakyTestsFound(flakyTests);

          assert.deepStrictEqual(logged, ["\nNo flaky tests found"]);
        });
      });

      context("when flaky tests are found", () => {
        const flakyTests: Test[] = [{ name: "test 10" }, { name: "test 23" }];

        it("logs an error with the number of flaky tests found and list their names", async () => {
          await reporter.flakyTestsFound(flakyTests);

          assert.deepStrictEqual(errored, [
            "\nFound 2 flaky tests",
            " - test 10",
            " - test 23",
          ]);
        });
      });
    });
  });
});
