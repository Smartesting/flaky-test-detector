import assert from "assert";
import executeTests from "./executeTests";
import { Status } from "./types";

describe("executeTests", () => {
  it('executes the command "repeat" times', async () => {
    let executions: number = 0;
    await executeTests(async () => {
      executions += 1;
      return [];
    }, 10);
    assert.deepStrictEqual(executions, 10);
  });

  it("executes all the command, even when some fail", async () => {
    let executions: number = 0;

    await executeTests(async () => {
      executions += 1;
      if (executions === 5) throw new Error("Oh no, a random failure ...");
      return [];
    }, 10);
    assert.deepStrictEqual(executions, 10);
  });

  it("returns all the tests that have been executed", async () => {
    let executions: number = 0;

    const tests = await executeTests(async () => {
      executions += 1;
      return [
        {
          name: "My test",
          status: executions % 2 ? Status.PASSED : Status.FAILED,
        },
      ];
    }, 3);
    assert.deepStrictEqual(tests, [
      {
        name: "My test",
        status: Status.PASSED,
      },
      {
        name: "My test",
        status: Status.FAILED,
      },
      {
        name: "My test",
        status: Status.PASSED,
      },
    ]);
  });
});
