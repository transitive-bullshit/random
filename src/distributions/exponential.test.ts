import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.exponential() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.exponential()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

test('random.exponential() invalid negative n input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.exponential(-1),
    'Expected number to be positive, got -1'
  )
})
