import test from 'ava'
import seedrandom from 'seedrandom'

import random from "../../src/random"

test('random.bates() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.bates()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})
