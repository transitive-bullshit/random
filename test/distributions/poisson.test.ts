import test from 'ava'
import seedrandom from 'seedrandom'

import random from '../../src/index'

test('random.poisson() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.poisson()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.poisson() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.poisson(-1)
    },
    { instanceOf: Error }
  )
  t.is(error?.message, 'Expected number to be positive, got -1')
})
