export enum Status {
  PASSED = "passed",
  FAILED = "failed",
}

export type Test = {
  name: string;
  status: Status;
};
