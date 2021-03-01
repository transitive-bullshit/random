import test from 'ava'
import seedrandom from 'seedrandom'

import random from '../../src/random'

test('random.bernoulli() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.bernoulli()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.bernoulli() p number input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.bernoulli(3)
    },
    { instanceOf: Error }
  )
  t.is(error.message, 'Expected number to be less than 1, got 3')
})

test('random.bernoulli() invalid p negative input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.bernoulli(-1)
    },
    { instanceOf: Error }
  )
  t.is(
    error.message,
    'Expected number to be greater than or equal to 0, got -1'
  )
})
