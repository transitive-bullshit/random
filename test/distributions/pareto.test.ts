import test from 'ava'
import seedrandom from 'seedrandom'

import random from '../../src/random'

test('random.pareto() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.pareto()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.pareto() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.pareto(-1)
    },
    { instanceOf: Error }
  )
  t.is(
    error.message,
    'Expected number to be greater than or equal to 0, got -1'
  )
})
