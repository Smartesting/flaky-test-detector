import assert from "assert";
import basic from "./basic";
import { Status } from "../types";

describe("flakyTestDetectors", () => {
  describe("basic", () => {
    it("returns an empty list when no tests are provided", () => {
      const flakyTests = basic([]);

      assert.deepStrictEqual(flakyTests, []);
    });

    context("when two tests have the same name but different statuses", () => {
      const name = "my test";
      it("returns the test name", () => {
        const flakyTests = basic([
          {
            name,
            status: Status.FAILED,
          },
          {
            name,
            status: Status.PASSED,
          },
        ]);

        assert.deepStrictEqual(flakyTests, [name]);
      });
    });

    context("two tests have the same name and the same statuses", () => {
      const name = "my test";
      it("does not return the test name", () => {
        const flakyTests = basic([
          {
            name,
            status: Status.PASSED,
          },
          {
            name,
            status: Status.PASSED,
          },
        ]);

        assert.deepStrictEqual(flakyTests, []);
      });
    });
  });
});
