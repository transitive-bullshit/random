import test, { ExecutionContext } from 'ava'
import seedrandom from 'seedrandom'

import inDelta from '../_in-delta'
import random from '../../src/random'
import RNGXOR128 from '../../src/generators/xor128'
import RNGFunction from '../../src/generators/function'
import RNGMathRandom from '../../src/generators/math-random'

type distFn = () => number

/**
 * @param d Distribution function
 * @returns Mean of d
 */
export const calcMean = (d: distFn) => {
  const n = 10000
  let sum = 0

  for (let i = 0; i < n; ++i) {
    const v = d()
    sum += v
  }

  return sum / n
}

/**
 * Assert numbers in [0, max)
 *
 * @param d Distribution function
 * @param max
 * @param t
 */
export const zeroMax = (d: distFn, max: number, t: ExecutionContext) => {
  const n = 10000

  for (let i = 0; i < n; ++i) {
    const v = d()

    if (v < 0 || v > max) {
      console.log(v)
    }

    t.true(v >= 0)
    t.true(v < max)
  }
}

/**
 * Assert random.uniform(min, max) returns numbers in [min, max)
 * @param d Distribution function
 */
export const inMinMax = (
  d: distFn,
  min: number,
  max: number,
  t: ExecutionContext
) => {
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.true(v >= min)
    t.true(v < max)
  }
}

test('random.uniform() is in [0, 1)', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.uniform()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.true(v >= 0)
    t.true(v < 1)
  }
})

test('random.uniform() with seedrandom has mean 0.5', (t) => {
  const r = random.clone(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  const d = r.uniform()
  const mean = calcMean(d)
  t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform() with RNGXOR128 has mean 0.5', (t) => {
  const r = random.clone(new RNGXOR128(3))
  const d = r.uniform()
  const mean = calcMean(d)
  t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform() with RNGFunction has mean 0.5', (t) => {
  const r = random.clone(new RNGFunction(Math.random))
  const d = r.uniform()
  const mean = calcMean(d)
  t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform() with RNGMathRandom has mean 0.5', (t) => {
  const r = random.clone(new RNGMathRandom())
  const d = r.uniform()
  const mean = calcMean(d)
  t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform(max) returns numbers in [0, max)', (t) => {
  const r = random.clone(seedrandom('ODEzYWI1MjQ2NGEwYWExOTRlZTJjYmI4'))
  const d = r.uniform(undefined, 42)
  zeroMax(d, 42, t)
})

test('random.uniform(max) with RNGXOR128 returns numbers in [0, max)', (t) => {
  const r = random.clone(new RNGXOR128(3))
  const d = r.uniform(undefined, 42)
  zeroMax(d, 42, t)
})

test('random.uniform(max) with RNGFunction returns numbers in [0, max)', (t) => {
  const r = random.clone(new RNGFunction(Math.random))
  const d = r.uniform(undefined, 42)
  zeroMax(d, 42, t)
})

test('random.uniform(max) with RNGMathRandom returns numbers in [0, max)', (t) => {
  const r = random.clone(new RNGMathRandom())
  const d = r.uniform(undefined, 42)
  zeroMax(d, 42, t)
})

test('random.uniform(max) has mean max / 2', (t) => {
  const r = random.clone(seedrandom('NjcwNjY0MDdiNTEzMmE4Y2I0ZWYxYzNl'))
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(max) RNGXOR128 has mean max / 2', (t) => {
  const r = random.clone(new RNGXOR128(3))
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(max) RNGFunction  has mean max / 2', (t) => {
  const r = random.clone(new RNGFunction(Math.random))
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(max) RNGMathRandom  has mean max / 2', (t) => {
  const r = random.clone(new RNGMathRandom())
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(min, max) returns numbers in [min, max)', (t) => {
  const r = random.clone(seedrandom('NWI0ZWQ0MDBkMGFmZGZkZGU1YjEwMThk'))
  const d = r.uniform(10, 42)
  inMinMax(d, 10, 42, t)
})

test('random.uniform(min, max) with RNGXOR128 returns numbers in [min, max)', (t) => {
  const r = random.clone(new RNGXOR128(2))
  const d = r.uniform(10, 42)
  inMinMax(d, 10, 42, t)
})

test('random.uniform(min, max) has mean (min + max) / 2', (t) => {
  const r = random.clone(seedrandom('M2M2ZGFiZDdkOGUzMjkwOTM1MzQwMWRm'))
  const d = r.uniform(10, 42)
  const mean = calcMean(d)
  t.true(inDelta(mean, 26, 0.5))
})

test('random.uniform(min, max) with RNGXOR128 has mean (min + max) / 2', (t) => {
  const r = random.clone(new RNGXOR128(2))
  const d = r.uniform(10, 42)
  const mean = calcMean(d)
  t.true(inDelta(mean, 26, 0.5))
})
