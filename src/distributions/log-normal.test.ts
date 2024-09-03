import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.logNormal() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.logNormal()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})
