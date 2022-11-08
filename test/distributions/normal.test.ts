import test from 'ava'
import seedrandom from 'seedrandom'

import inDelta from '../_in-delta'
import random from '../../src/index'
import RNGXOR128 from '../../src/generators/xor128'
import RNGFunction from '../../src/generators/function'
import RNGMathRandom from '../../src/generators/math-random'

test('random.normal() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.normal()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

const meanN = <T>(t: T) => {
  const r = random.clone(t)
  const d = r.normal(120)
  let sum = 0

  for (let i = 0; i < 10000; ++i) {
    const v = d()
    sum += v
  }
  return sum / 10000
}

test('random.normal(120) has mean 120', (t) => {
  const mean = meanN(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  t.true(inDelta(mean, 120, 0.5))
})

test('random.normal(120) with RNGXOR128 has mean 120', (t) => {
  const mean = meanN(new RNGXOR128(100))
  t.true(inDelta(mean, 120, 0.5))
})

test('random.normal(120) with RNGFunction has mean 120', (t) => {
  const mean = meanN(new RNGFunction(Math.random))
  t.true(inDelta(mean, 120, 0.5))
})

test('random.normal(120) with RNGMathRandom has mean 120', (t) => {
  const mean = meanN(new RNGMathRandom())
  t.true(inDelta(mean, 120, 0.5))
})
