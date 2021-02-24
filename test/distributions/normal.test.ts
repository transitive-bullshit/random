import test from 'ava'
import seedrandom from 'seedrandom'

import inDelta from '../_in-delta'
import random from "../../src/random"

test('random.normal() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.normal()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.normal(120) has mean 120', (t) => {
  const r = random.clone(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  const d = r.normal(120)
  let sum = 0

  for (let i = 0; i < 10000; ++i) {
    const v = d()
    sum += v
  }

  const mean = sum / 10000
  t.true(inDelta(mean, 120, 0.5))
})
