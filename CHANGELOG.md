# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2](https://github.com/Smartesting/flaky-test-detector/compare/v1.0.1...v1.0.2)

### Fixed

- fix README information about program arguments

## [1.0.1](https://github.com/Smartesting/flaky-test-detector/compare/v1.0.0...v1.0.1)

### Changed

- use `@cucumber/cucumber-json-converter` library for better Cucumber JSON test result parsing

## [1.0.0](https://github.com/Smartesting/flaky-test-detector/compare/v0.1.1...v1.0.0)

### Added

- add a new test result parser for Cucumber Json format
- add **mandatory** option `test-output-format` to set the format of the passed test output file. Possible values are `junit` and `cucumberJson`.

## [0.1.1](https://github.com/Smartesting/flaky-test-detector/compare/v0.1.0...v0.1.1)

### Fixed

- Fix path to executable

## [0.1.0](https://github.com/Smartesting/flaky-test-detector/compare/904f61b4970af30387af2aa1db2efee990ac8ada...v0.1.0)

### Added

- Added basic runner to detect flaky tests
