import { ReportParser, Status, TestExecution } from '../../types'
import { convert } from '@cucumber/cucumber-json-converter'
import {
  CucumberJsonElement,
  CucumberJsonFeature,
  CucumberJsonStep,
} from '@cucumber/cucumber-json-converter/dist/cjs/src/CucumberJson'

const cucumberJson: ReportParser = async (report: string) => {
  try {
    const features = convert(JSON.parse(report)).features
    return features.flatMap(extractFeatureTests)
  } catch (e) {
    throw new Error('Invalid Cucumber Json')
  }
}

function extractFeatureTests(
  feature: CucumberJsonFeature
): ReadonlyArray<TestExecution> {
  const name = feature.name
  const uri = feature.uri
  const elements = feature.elements
  return extractTestExecutions(elements, [uri, name])
}

function extractTestExecutions(
  elements: ReadonlyArray<CucumberJsonElement>,
  path: string[]
): ReadonlyArray<TestExecution> {
  return elements.map((element) => ({
    status: computeStatusFromSteps(element.steps),
    test: { name: element.name, path },
  }))
}

function computeStatusFromSteps(
  steps: ReadonlyArray<CucumberJsonStep>
): Status {
  return steps.find((step) => step.result.status === 'failed')
    ? Status.FAILED
    : Status.PASSED
}

export default cucumberJson
