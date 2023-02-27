import { ReportParser, Status, TestExecution } from "../types";

const cucumberJson: ReportParser = async (report: string) => {
  const features = JSON.parse(report);
  if (!Array.isArray(features))
    throw new Error(
      "Invalid Cucumber Json. Root should be an array of features"
    );
  return extractTests(features);
};

function extractTests(
  features: ReadonlyArray<any>
): ReadonlyArray<TestExecution> {
  return features.flatMap(extractFeatureTests);
}

function extractFeatureTests(feature: any): ReadonlyArray<TestExecution> {
  const name = feature.name;
  const uri = feature.uri;
  const elements = feature.elements;
  if (!name || !uri || !elements) {
    throw new Error(
      `Invalid Cucumber Json. Expected feature to have name,uri and elements but got: ${JSON.stringify(
        feature
      )}`
    );
  }
  if (!Array.isArray(elements)) {
    throw new Error(
      `Invalid Cucumber Json. Expected feature.elements to be an array but got: ${JSON.stringify(
        elements
      )}`
    );
  }
  console.log(`extract test executions from feature ${uri}: ${name}`);
  const collector: TestExecution[] = [];
  extractTestExecutions(elements, [uri, name], collector);
  return collector;
}

function extractTestExecutions(
  elements: Array<any>,
  path: string[],
  collector: TestExecution[]
) {
  for (const element of elements) {
    if (!element.name || !element.steps) {
      throw new Error(
        `Invalid Cucumber Json. Expected element item to have name and steps but got: ${JSON.stringify(
          element
        )}`
      );
    }
    collector.push({
      status: computeStatusFromSteps(element.steps),
      test: { name: element.name, path },
    });
  }
}

function computeStatusFromSteps(steps: Array<any>): Status {
  return steps.find((step) => step.result.status === "failed")
    ? Status.FAILED
    : Status.PASSED;
}

export default cucumberJson;
