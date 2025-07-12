import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.bernoulli() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.bernoulli()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

test('random.bernoulli() p number input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.bernoulli(3),
    'Expected number to be less than or equal to 1, got 3'
  )
})

test('random.bernoulli() invalid p negative input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.bernoulli(-1),
    'Expected number to be greater than or equal to 0, got -1'
  )
})
