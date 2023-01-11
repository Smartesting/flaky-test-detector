import { Status, Test } from "../types";
import { parse, TestCase, TestSuite, TestSuites } from "junit2json";

export default async function junit(
  xmlString: string
): Promise<ReadonlyArray<Test>> {
  const testSuites = await parse(xmlString);
  if (!testSuites) throw new Error("Invalid Junit XML");

  if (isTestSuite(testSuites)) {
    return extractTests(testSuites);
  }

  if (!testSuites.testsuite) return [];

  return testSuites.testsuite.reduce<Test[]>(
    (tests, testSuite) => tests.concat(...extractTests(testSuite, testSuites)),
    []
  );
}

function extractTests(
  testSuite: TestSuite,
  testSuites?: TestSuite
): ReadonlyArray<Test> {
  const testCases = testSuite.testcase || [];
  return testCases.map((testCase) => {
    const name = makeTestName(testCase, testSuite, testSuites);
    const status = testCase.failure ? Status.FAILED : Status.PASSED;

    return { name, status };
  });
}

function makeTestName(
  testCase: TestCase,
  testSuite: TestSuite,
  testSuites?: TestSuites
) {
  return [testSuites?.name, testSuite.name, testCase.name]
    .filter(validSegment)
    .join("/");
}

function validSegment(segment: string | undefined) {
  return !!segment;
}

function isTestSuite(testSuite: unknown): testSuite is TestSuite {
  return (testSuite as TestSuite).testcase !== undefined;
}
