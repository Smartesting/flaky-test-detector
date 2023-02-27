import assert from 'assert'

describe('Sample suite', () => {
  it('is a stable test', () => {
    assert(true)
  })

  it('is a stable test (although it fails)', () => {
    assert(false)
  })

  it('is a flaky test', () => {
    const rand = Math.random()
    assert(rand >= 0.5)
  })

  it.skip('is a test that is not executed', () => {})
})
