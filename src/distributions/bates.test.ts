import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.bates() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.bates()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

test('random.bates() invalid n float input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))

  assert.throws(() => r.bates(1.3), 'Expected number to be an integer, got 1.3')
})

test('random.bates() invalid negative n input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))

  assert.throws(() => r.bates(-1), 'Expected number to be positive, got -1')
})
