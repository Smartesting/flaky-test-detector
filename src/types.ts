export enum Status {
  PASSED = "passed",
  FAILED = "failed",
}

export type Test = {
  name: string;
  path?: string[];
};

export type TestExecution = {
  test: Test;
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

export type Command = () => Promise<ReadonlyArray<TestExecution>>;

export type ReportParser = (
  report: string
) => Promise<ReadonlyArray<TestExecution>>;

export type FlakyTestDetector = (
  testExecutions: ReadonlyArray<TestExecution>
) => ReadonlyArray<Test>;

export interface Reporter {
  testSuiteStarted: (index: number) => Promise<void>;
  testSuiteEnded: (index: number) => Promise<void>;
  flakyTestsFound: (flakytests: ReadonlyArray<Test>) => Promise<void>;
}

export type Logger = {
  log: typeof console.log;
  error: typeof console.error;
};

export type TestExecutor = (
  command: Command,
  repeat: number,
  reporter: Reporter
) => Promise<ReadonlyArray<TestExecution>>;
