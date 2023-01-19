import { ReportParser, Status, TestExecution } from "../types";
import { parse, TestSuite, TestSuites } from "junit2json";

const junit: ReportParser = async (junitReport: string) => {
  const testSuites = await parse(junitReport);
  if (!testSuites) throw new Error("Invalid Junit XML");

  if (isTestSuite(testSuites)) {
    return extractTests(testSuites);
  }

  if (!testSuites.testsuite) return [];

  return testSuites.testsuite.reduce<TestExecution[]>(
    (tests, testSuite) => tests.concat(...extractTests(testSuite, testSuites)),
    []
  );
};

function extractTests(
  testSuite: TestSuite,
  testSuites?: TestSuite
): ReadonlyArray<TestExecution> {
  const testCases = testSuite.testcase || [];
  return testCases.map((testCase) => {
    const name = testCase.name ?? "";
    const path = makeTestPath(testSuite, testSuites);
    const status = testCase.failure ? Status.FAILED : Status.PASSED;

    return { test: { name, path }, status };
  });
}

function makeTestPath(testSuite: TestSuite, testSuites?: TestSuites): string[] {
  return [testSuites?.name, testSuite.name].filter(
    (segment) => segment !== undefined
  ) as string[];
}

function isTestSuite(testSuite: unknown): testSuite is TestSuite {
  return (testSuite as TestSuite).testcase !== undefined;
}

export default junit;
