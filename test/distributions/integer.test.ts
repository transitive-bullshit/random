import test from 'ava'
import seedrandom from 'seedrandom'
import random from '../../src/random'

test('random.int() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int()
    t.is(typeof v, 'number')
  }
})

test('random.int() with max produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int(100)
    t.is(typeof v, 'number')
  }
})

test('random.int() with min max produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int(10, 100)
    t.is(typeof v, 'number')
  }
})
