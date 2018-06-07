import test from 'ava'
import d3 from 'd3-array'

import random from '../'

test('random.uniform() is in [0, 1)', (t) => {
  const rng = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  d3.mean(d3.range(10000).map(
  for (let i = 0; i < 10000; ++i) {
    const v = random.uniform()
    t.true(v >= 0)
    t.true(v < 1)
  }
})

test('random.uniform() has mean 0.5', (t) => {
  for (let i = 0; i < 10000; ++i) {
    const v = random.uniform()
    t.true(v >= 0)
    t.true(v < 1)
  }
})
