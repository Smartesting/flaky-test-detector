import assert from "assert";
import { Logger } from "../types";
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
        await reporter.testSuiteEnded(1);

        assert.deepStrictEqual(logged, ["Test suite #1 ended"]);
      });
    });

    describe("flakyTestsFound", () => {
      context("when no flaky tests are found", () => {
        const flakyTests: string[] = [];
        it("logs a message about flaky tests", async () => {
          await reporter.flakyTestsFound(flakyTests);

          assert.deepStrictEqual(logged, ["No flaky tests found"]);
        });
      });

      context("when flaky tests are found", () => {
        const flakyTests: string[] = ["test 10", "test 23"];

        it("logs an error with the number of flaky tests found and list their names", async () => {
          await reporter.flakyTestsFound(flakyTests);

          assert.deepStrictEqual(errored, [
            "Found 2 flaky tests",
            " - test 10",
            " - test 23",
          ]);
        });
      });
    });
  });
});
