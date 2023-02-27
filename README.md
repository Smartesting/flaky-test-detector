# @smartesting/flaky-test-detector

[![Node.js CI](https://github.com/Smartesting/flaky-test-detector/actions/workflows/node.js.yml/badge.svg)](https://github.com/Smartesting/flaky-test-detector/actions/workflows/node.js.yml)

KISS approach for flaky test detection:

- run the tests `n` times
- check the results
- find tests which do not have consistent results

## Installing

```
npm i @smartesting/flaky-test-detector
```

## Detect flaky tests

Add a target in your `package.json` file:

```json
{
  "scripts": {
    "detectFlaky": "flaky-test-detector.ts --run-tests \"npm run test\" --test-output-file=./test-results.xml --test-output-format=junit --repeat=5"
  }
}
```

The script takes four arguments:

- `run-tests`: the command used to execute the tests
- `test-output-file`: the file in which the test runner will output the result. Only JUnit reports are supported for now
- `test-output-format`: the test result format of the test output file. Should be `junit`or `cucumberJson`
- `repeat`: the number of time the tests will be executed
