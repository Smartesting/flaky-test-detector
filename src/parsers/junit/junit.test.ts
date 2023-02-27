import assert from 'assert'
import { Status } from '../../types'
import junit from './junit'

describe('parsers', () => {
  describe('junit', () => {
    const testResults = [
      { name: 'First test', failed: false },
      { name: 'Second test', failed: true },
    ]

    it('throws an error when the input is not a valid Junit XML file', () => {
      assert.rejects(() => junit('notXml'), new Error('Invalid Junit XML'))
      assert.rejects(
        () => junit('<?xml version="1.0" encoding="UTF-8"?><notJunit />'),
        new Error('Invalid Junit XML')
      )
    })

    context('when the root of the document is a testSuite node', () => {
      it('returns the list of tests with the statuses', async () => {
        const junitReport = `<?xml version="1.0" encoding="UTF-8"?>
          ${makeTestSuiteXML(testResults)}
        `
        const tests = await junit(inlineXml(junitReport))
        assert.deepStrictEqual(tests, [
          {
            test: { name: 'First test', path: [] },
            status: Status.PASSED,
          },
          {
            test: { name: 'Second test', path: [] },
            status: Status.FAILED,
          },
        ])
      })

      it('adds the name of the test suite in the path', async () => {
        const junitReport = `<?xml version="1.0" encoding="UTF-8"?>
          ${makeTestSuiteXML(testResults, 'Sample suite')}
        `
        const tests = await junit(inlineXml(junitReport))
        assert.deepStrictEqual(tests, [
          {
            test: { name: 'First test', path: ['Sample suite'] },
            status: Status.PASSED,
          },
          {
            test: { name: 'Second test', path: ['Sample suite'] },
            status: Status.FAILED,
          },
        ])
      })
    })

    context('when the root of the document is a testSuites node', () => {
      it('returns the list of tests with the statuses', async () => {
        const junitReport = `<?xml version="1.0" encoding="UTF-8"?>
          <testsuites>
            ${makeTestSuiteXML(testResults)}
          </testsuites>
        `
        const tests = await junit(inlineXml(junitReport))
        assert.deepStrictEqual(tests, [
          {
            test: { name: 'First test', path: [] },
            status: Status.PASSED,
          },
          {
            test: { name: 'Second test', path: [] },
            status: Status.FAILED,
          },
        ])
      })

      it('handles multiple suites', async () => {
        const junitReport = `<?xml version="1.0" encoding="UTF-8"?>
          <testsuites>
            ${makeTestSuiteXML(testResults)}
            ${makeTestSuiteXML(testResults)}
          </testsuites>
        `
        const tests = await junit(inlineXml(junitReport))
        assert.deepStrictEqual(tests, [
          {
            test: { name: 'First test', path: [] },
            status: Status.PASSED,
          },
          {
            test: { name: 'Second test', path: [] },
            status: Status.FAILED,
          },
          {
            test: { name: 'First test', path: [] },
            status: Status.PASSED,
          },
          {
            test: { name: 'Second test', path: [] },
            status: Status.FAILED,
          },
        ])
      })

      it('adds the testSuites name to the path if available', async () => {
        const junitReport = `<?xml version="1.0" encoding="UTF-8"?>
          <testsuites name="My test suites">
            ${makeTestSuiteXML(testResults, 'First suite')}
            ${makeTestSuiteXML(testResults, 'Second suite')}
          </testsuites>
        `
        const tests = await junit(inlineXml(junitReport))
        assert.deepStrictEqual(tests, [
          {
            test: {
              name: 'First test',
              path: ['My test suites', 'First suite'],
            },
            status: Status.PASSED,
          },
          {
            test: {
              name: 'Second test',
              path: ['My test suites', 'First suite'],
            },
            status: Status.FAILED,
          },
          {
            test: {
              name: 'First test',
              path: ['My test suites', 'Second suite'],
            },
            status: Status.PASSED,
          },
          {
            test: {
              name: 'Second test',
              path: ['My test suites', 'Second suite'],
            },
            status: Status.FAILED,
          },
        ])
      })
    })
  })
})

function makeTestSuiteXML(
  tests: { name: string; failed: boolean }[],
  name?: string
) {
  return `<testsuite${name ? ` name="${name}"` : ''}>
    ${tests.map((test) => makeTestXML(test)).join('\n')}
  </testsuite>`
}

function makeTestXML({ name, failed }: { name: string; failed: boolean }) {
  return `<testcase name="${name}" time="0.01">
    ${failed ? '<failure>Error: Something wrong.</failure>' : ''}
  </testcase>`
}

// Utility function to avoid any issues with indentation.
function inlineXml(xml: string) {
  return xml
    .split('\n')
    .map((line) => line.trim())
    .join('')
}
