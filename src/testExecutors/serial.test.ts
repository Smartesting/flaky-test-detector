import assert from "assert";
import serial from "./serial";
import { Status } from "../types";
import NullReporter from "../reporters/null";

describe("testExecutors", () => {
  const nullReporter = new NullReporter();

  describe("serial", () => {
    it('executes the command "repeat" times', async () => {
      let executions: number = 0;
      await serial(
        async () => {
          executions += 1;
          return [];
        },
        10,
        nullReporter
      );
      assert.deepStrictEqual(executions, 10);
    });

    it("executes all the command, even when some fail", async () => {
      let executions: number = 0;

      await serial(
        async () => {
          executions += 1;
          if (executions === 5) throw new Error("Oh no, a random failure ...");
          return [];
        },
        10,
        nullReporter
      );
      assert.deepStrictEqual(executions, 10);
    });

    it("returns all the tests that have been executed", async () => {
      let executions: number = 0;

      const tests = await serial(
        async () => {
          executions += 1;
          return [
            {
              test: { name: "My test" },
              status: executions % 2 ? Status.PASSED : Status.FAILED,
            },
          ];
        },
        3,
        nullReporter
      );
      assert.deepStrictEqual(tests, [
        {
          test: { name: "My test" },
          status: Status.PASSED,
        },
        {
          test: { name: "My test" },
          status: Status.FAILED,
        },
        {
          test: { name: "My test" },
          status: Status.PASSED,
        },
      ]);
    });
  });
});
