export enum Status {
  PASSED,
  FAILED,
}

export type Test = {
  name: string;
  status: Status;
};
