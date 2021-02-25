import test, { ExecutionContext } from 'ava'
import seedrandom from 'seedrandom'

import inDelta from '../_in-delta'
import random from '../../src/random'
import RNGXOR128 from '../../src/generators/xor128'
import RNGFunction from '../../src/generators/function'
import RNGMathRandom from '../../src/generators/math-random'

test('random.uniform() is in [0, 1)', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.uniform()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.true(v >= 0)
    t.true(v < 1)
  }
})

const meanHalf = <T>(R: T) => {
  const r = random.clone(R)
  const d = r.uniform()

  let sum = 0

  for (let i = 0; i < 10000; ++i) {
    const v = d()
    sum += v
  }

  return sum / 10000
}

test('random.uniform() with seedrandom has mean 0.5', (t) => {
  const mean = meanHalf(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform() with RNGXOR128 has mean 0.5', (t) => {
  const mean = meanHalf(new RNGXOR128(3))
  t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform() with RNGFunction has mean 0.5', (t) => {
  const mean = meanHalf(new RNGFunction(Math.random))
  t.true(inDelta(mean, 0.5, 0.05))
})

test('random.uniform() with RNGMathRandom has mean 0.5', (t) => {
  const mean = meanHalf(new RNGMathRandom())
  t.true(inDelta(mean, 0.5, 0.05))
})

const zeroMax = <T>(R: T, t: ExecutionContext) => {
  const r = random.clone(R)
  const d = r.uniform(undefined, 42)
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.true(v >= 0)
    t.true(v < 42)
  }
}

test('random.uniform(max) returns numbers in [0, max)', (t) => {
  zeroMax(seedrandom('ODEzYWI1MjQ2NGEwYWExOTRlZTJjYmI4'), t)
})

test('random.uniform(max) with RNGXOR128 returns numbers in [0, max)', (t) => {
  zeroMax(new RNGXOR128(3), t)
})

test('random.uniform(max) with RNGFunction returns numbers in [0, max)', (t) => {
  zeroMax(new RNGFunction(Math.random), t)
})

test('random.uniform(max) with RNGMathRandom returns numbers in [0, max)', (t) => {
  zeroMax(new RNGMathRandom(), t)
})

const meanMaxDivTwo = <T>(R: T) => {
  const r = random.clone(R)
  const d = r.uniform(undefined, 42)
  let sum = 0

  for (let i = 0; i < 10000; ++i) {
    const v = d()
    sum += v
  }

  return sum / 10000
}

test('random.uniform(max) has mean max / 2', (t) => {
  const mean = meanMaxDivTwo(seedrandom('NjcwNjY0MDdiNTEzMmE4Y2I0ZWYxYzNl'))
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(max) RNGXOR128 has mean max / 2', (t) => {
  const mean = meanMaxDivTwo(new RNGXOR128(3))
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(max) RNGFunction  has mean max / 2', (t) => {
  const mean = meanMaxDivTwo(new RNGFunction(Math.random))
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(max) RNGMathRandom  has mean max / 2', (t) => {
  const mean = meanMaxDivTwo(new RNGMathRandom())
  t.true(inDelta(mean, 21, 0.5))
})

test('random.uniform(min, max) returns numbers in [min, max)', (t) => {
  const r = random.clone(seedrandom('NWI0ZWQ0MDBkMGFmZGZkZGU1YjEwMThk'))
  const d = r.uniform(10, 42)
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.true(v >= 10)
    t.true(v < 42)
  }
})

test('random.uniform(min, max) has mean (min + max) / 2', (t) => {
  const r = random.clone(seedrandom('M2M2ZGFiZDdkOGUzMjkwOTM1MzQwMWRm'))
  const d = r.uniform(10, 42)
  let sum = 0

  for (let i = 0; i < 10000; ++i) {
    const v = d()
    sum += v
  }

  const mean = sum / 10000
  t.true(inDelta(mean, 26, 0.5))
})
