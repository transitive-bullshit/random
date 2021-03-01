import test from 'ava'
import seedrandom from 'seedrandom'

import random from '../../src/random'

test('random.exponential() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.exponential()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.exponential() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.exponential(-1)
    },
    { instanceOf: Error }
  )
  t.is(error.message, 'Expected number to be positive, got -1')
})
