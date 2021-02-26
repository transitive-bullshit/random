import test from 'ava'
import { ArgumentError } from 'ow'
import seedrandom from 'seedrandom'

import random from '../../src/random'

test('random.geometric() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.geometric()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.geometric() invalid positive n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(() => {
    r.geometric(2)
  }, { instanceOf: ArgumentError })
  t.is(error.message, 'Expected number to be less than 1, got 2')
})

test('random.geometric() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(() => {
    r.geometric(-1)
  }, { instanceOf: ArgumentError })
  t.is(error.message, 'Expected number to be greater than 0, got -1')
})
