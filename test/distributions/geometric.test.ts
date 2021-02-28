import test from 'ava'
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
  const error = t.throws(
    () => {
      r.geometric(2)
    },
    { instanceOf: Error }
  )
  t.is(error.message, 'Expected number `argument` `2` failed predicate `lte`')
})

test('random.geometric() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.geometric(-1)
    },
    { instanceOf: Error }
  )
  t.is(error.message, 'Expected number `argument` `-1` failed predicate `gt`')
})
