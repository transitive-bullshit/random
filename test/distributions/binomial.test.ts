import test from 'ava'
import { ArgumentError } from 'ow'
import seedrandom from 'seedrandom'

import random from '../../src/random'

test('random.binomial() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.binomial()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.binomial() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.binomial(-1)
    },
    { instanceOf: ArgumentError }
  )
  t.is(error.message, 'Expected number to be positive, got -1')
})

test('random.binomial() invalid positive p input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.binomial(1, 3)
    },
    { instanceOf: ArgumentError }
  )
  t.is(error.message, 'Expected number to be less than 1, got 3')
})
