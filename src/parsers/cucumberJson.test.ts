import assert from "assert";
import { Status } from "../types";
import cucumberJson from "./cucumberJson";

describe("parsers", () => {
  describe("cucumberJson", () => {
    const testResults = [
      {
        elements: [
          {
            name: "Positive scenario",
            steps: [
              {
                result: {
                  status: "passed",
                },
              },
            ],
          },
          {
            name: "Negative scenario",
            steps: [
              {
                result: {
                  status: "failed",
                },
              },
            ],
          },
        ],
        name: "Feature with 2 scenarios",
        uri: "features\\two-scenarios.feature",
      },
      {
        elements: [
          {
            name: "Should pass",
            steps: [
              {
                result: {
                  status: "passed",
                },
              },
            ],
          },
        ],
        name: "Feature with only once scenario",
        uri: "features\\once-scenario.feature",
      },
    ];

    it("throws an error when the input is not a valid Cucumber Json file", () => {
      assert.rejects(
        () => cucumberJson("notJson"),
        new Error("Invalid Cucumber Json")
      );
      assert.rejects(
        () => cucumberJson("{polop:true}"),
        new Error("Invalid Cucumber Json")
      );
    });

    it("returns the scenarios as test with feature as path", async () => {
      const tests = await cucumberJson(JSON.stringify(testResults));
      assert.deepStrictEqual(tests, [
        {
          test: {
            name: "Positive scenario",
            path: [
              "features\\two-scenarios.feature",
              "Feature with 2 scenarios",
            ],
          },
          status: Status.PASSED,
        },
        {
          test: {
            name: "Negative scenario",
            path: [
              "features\\two-scenarios.feature",
              "Feature with 2 scenarios",
            ],
          },
          status: Status.FAILED,
        },
        {
          test: {
            name: "Should pass",
            path: [
              "features\\once-scenario.feature",
              "Feature with only once scenario",
            ],
          },
          status: Status.PASSED,
        },
      ]);
    });
  });
});
