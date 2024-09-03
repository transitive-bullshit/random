import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.binomial() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.binomial()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

test('random.binomial() invalid negative n input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(() => r.binomial(-1), 'Expected number to be positive, got -1')
})

test('random.binomial() invalid positive p input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.binomial(1, 3),
    'Expected number to be less than 1, got 3'
  )
})
