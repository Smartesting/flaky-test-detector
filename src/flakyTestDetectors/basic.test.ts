import assert from "assert";
import basic from "./basic";
import { Status } from "../types";

describe("flakyTestDetectors", () => {
  describe("basic", () => {
    const name = "my test";
    const test1 = { name };
    const test2 = { name };

    it("returns an empty list when no tests are provided", () => {
      const flakyTests = basic([]);

      assert.deepStrictEqual(flakyTests, []);
    });

    context(
      "when two tests executions for the same test have different statuses",
      () => {
        it("returns the test", () => {
          const flakyTests = basic([
            {
              test: test1,
              status: Status.FAILED,
            },
            {
              test: test2,
              status: Status.PASSED,
            },
          ]);

          assert.deepStrictEqual(flakyTests, [test1]);
        });
      }
    );

    context(
      "when two tests executions for the same test have the same statuses",
      () => {
        it("does not return the test", () => {
          const flakyTests = basic([
            {
              test: test1,
              status: Status.PASSED,
            },
            {
              test: test2,
              status: Status.PASSED,
            },
          ]);

          assert.deepStrictEqual(flakyTests, []);
        });
      }
    );
  });
});
