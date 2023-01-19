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
  exitCode: string;
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

export interface Reporter {
  testSuiteStarted: (index: number) => Promise<void>;
  testSuiteEnded: (index: number) => Promise<void>;
  flakyTestsFound: (flakytests: ReadonlyArray<string>) => Promise<void>;
}

export type Logger = {
  log: typeof console.log;
  error: typeof console.error;
};

export type TestExecutor = (
  command: Command,
  repeat: number,
  reporter: Reporter
) => Promise<ReadonlyArray<Test>>;
