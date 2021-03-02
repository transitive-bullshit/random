import test from 'ava'
import seedrandom from 'seedrandom'
import random from '../../src/random'
import inDelta from '../_in-delta'

test('random.int() produces numbers in [0,1]', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int()
    t.true(v >= 0)
    t.true(v <= 1)
  }
})

test('random.int() with max produces numbers in [0, max]', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int(100)
    t.true(v >= 0)
    t.true(v <= 100)
  }
})

test('random.int() with min max produces numbers in [min, max]', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int(10, 100)
    t.true(v >= 10)
    t.true(v <= 100)
  }
})

test('random.int() has a mean of 0.5', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const n = 10000
  let sum = 0
  for (let i = 0; i < n; ++i) {
    const v = r.int()
    sum += v
  }
  const mean = sum / n
  t.true(inDelta(mean, 0.5, 0.05))
})
