import assert from 'assert'
import { Status } from '../../types'
import cucumberJson from './cucumberJson'
import testResultsSample from './test-results.json'

describe('parsers', () => {
  describe('cucumberJson', () => {
    it('throws an error when the input is not a valid Cucumber Json file', () => {
      assert.rejects(
        () => cucumberJson('notJson'),
        new Error('Invalid Cucumber Json')
      )
      assert.rejects(
        () => cucumberJson('{polop:true}'),
        new Error('Invalid Cucumber Json')
      )
    })

    it('returns the scenarios as test with feature as path', async () => {
      const tests = await cucumberJson(JSON.stringify(testResultsSample))
      assert.deepStrictEqual(tests, [
        {
          test: {
            name: 'Henry consults a session after receiving user actions',
            path: ['features\\session-consult.feature', 'View a session'],
          },
          status: Status.PASSED,
        },
        {
          test: {
            name: 'A session can spread across multiple domains',
            path: ['features\\session-consult.feature', 'View a session'],
          },
          status: Status.FAILED,
        },
        {
          test: {
            name: 'Display user sessions',
            path: [
              'features\\usage-coverage.feature',
              'Get coverage of an existing usage',
            ],
          },
          status: Status.PASSED,
        },
        {
          test: {
            name: 'Display test sessions',
            path: [
              'features\\usage-coverage.feature',
              'Get coverage of an existing usage',
            ],
          },
          status: Status.PASSED,
        },
        {
          test: {
            name: 'Compute coverage of usage collection according to traits of usage scope',
            path: [
              'features\\usage-coverage.feature',
              'Get coverage of an existing usage',
            ],
          },
          status: Status.PASSED,
        },
        {
          test: {
            name: 'Compute coverage of test collection according to traits of test scope',
            path: [
              'features\\usage-coverage.feature',
              'Get coverage of an existing usage',
            ],
          },
          status: Status.PASSED,
        },
        {
          test: {
            name: 'Compute coverage of usage collection according to time range of usage scope',
            path: [
              'features\\usage-coverage.feature',
              'Get coverage of an existing usage',
            ],
          },
          status: Status.PASSED,
        },
        {
          test: {
            name: 'Compute coverage of test collection according to time range of test scope',
            path: [
              'features\\usage-coverage.feature',
              'Get coverage of an existing usage',
            ],
          },
          status: Status.PASSED,
        },
      ])
    })
  })
})
