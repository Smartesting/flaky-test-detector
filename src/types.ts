export enum Status {
  PASSED = "passed",
  FAILED = "failed",
}

export type Test = {
  name: string;
  status: Status;
};

export type Options = {
  repeat: string;
  runTests: string;
  testOutputFile: string;
};

export type CommandFactory = (
  options: Options,
  reportParser: ReportParser
) => Command;

export type Command = () => Promise<ReadonlyArray<Test>>;

export type ReportParser = (report: string) => Promise<ReadonlyArray<Test>>;

export type FlakyTestDetector = (
  tests: ReadonlyArray<Test>
) => ReadonlyArray<string>;
