import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.pareto() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.pareto()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

test('random.pareto() invalid negative n input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.pareto(-1),
    'Expected number to be greater than or equal to 0, got -1'
  )
})
