import { exec } from 'child_process'
import { readFileSync } from 'fs'
import { CommandFactory, TestExecution } from './types'

const commandFactory: CommandFactory = (options, reportParser) => {
  return async () => {
    return new Promise<ReadonlyArray<TestExecution>>((resolve) => {
      const testRun = exec(options.runTests)

      testRun.on('exit', () => {
        const report = readFileSync(options.testOutputFile, 'utf-8')
        reportParser(report).then(resolve)
      })
    })
  }
}

export default commandFactory
