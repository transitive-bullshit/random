import test from 'ava'
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
    { instanceOf: Error }
  )
  t.is(
    error.message,
    'Expected number `argument` `-1` failed predicate `positive`'
  )
})

test('random.binomial() invalid positive p input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.binomial(1, 3)
    },
    { instanceOf: Error }
  )
  t.is(error.message, 'Expected number `argument` `3` failed predicate `lte`')
})
