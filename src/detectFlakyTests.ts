import { Status, Test } from "./types";

export default function detectFlakyTests(
  tests: ReadonlyArray<Test>
): ReadonlyArray<string> {
  const statusByName = groupTestStatusesByName(tests);
  return Object.entries(statusByName)
    .filter(([_name, statuses]) => uniq(statuses).length > 1)
    .map(([name]) => name);
}

function groupTestStatusesByName(tests: ReadonlyArray<Test>): {
  [key: string]: Status[];
} {
  const statusesByName: { [key: string]: Status[] } = {};
  for (const test of tests) {
    if (!statusesByName[test.name]) {
      statusesByName[test.name] = [];
    }
    statusesByName[test.name].push(test.status);
  }

  return statusesByName;
}

function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}