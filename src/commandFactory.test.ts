import assert from "assert";
import fs from "fs";
import path from "path";
import { Status, Test } from "./types";
import commandFactory from "./commandFactory";

describe("commandFactory", () => {
  let tempDir: string;
  let testOutputFile: string;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync("flaky-test-detector-tests");
    testOutputFile = path.join(tempDir, "report.xml");
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true });
  });

  it("waits for the command to finish", async () => {
    const command = commandFactory(
      {
        repeat: "",
        exitCode: "",
        runTests: `./bin/test-utils/sleep 200 > ${testOutputFile}`,
        testOutputFile,
      },
      async () => []
    );

    await command();
    assert.strictEqual(
      fs.readFileSync(testOutputFile, "utf-8"),
      "Waited for 200ms\n"
    );
  });

  it("does not read the report until the command has finished", async () => {
    let readReport = "";

    const command = commandFactory(
      {
        repeat: "",
        exitCode: "",
        runTests: `./bin/test-utils/sleep 200 > ${testOutputFile}`,
        testOutputFile,
      },
      async (report) => {
        readReport = report;
        return [];
      }
    );

    await command();
    assert.strictEqual(readReport, "Waited for 200ms\n");
  });

  it("returns whatever tests have been found by the reportParser", async () => {
    const test: Test = {
      name: "My test",
      status: Status.PASSED,
    };

    const command = commandFactory(
      {
        repeat: "",
        exitCode: "",
        runTests: `./bin/test-utils/sleep 200 > ${testOutputFile}`,
        testOutputFile,
      },
      async () => {
        return [test];
      }
    );

    const tests = await command();
    assert.deepStrictEqual(tests, [test]);
  });
});
