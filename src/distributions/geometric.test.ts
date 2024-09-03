import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.geometric() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.geometric()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

test('random.geometric() invalid positive n input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.geometric(2),
    'Expected number to be less than 1, got 2'
  )
})

test('random.geometric() invalid negative n input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.geometric(-1),
    'Expected number to be greater than 0, got -1'
  )
})
