import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import { FunctionRNG } from '../../src/generators/function'
import { MathRandomRNG } from '../../src/generators/math-random'
import { XOR128RNG } from '../../src/generators/xor128'
import random from '../random'

type distFn = () => number

/**
 * @param d Distribution function
 * @returns Mean of d
 */
const calcMean = (d: distFn) => {
  const n = 10_000
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
const assertZeroMax = (d: distFn, max: number) => {
  const n = 10_000

  for (let i = 0; i < n; ++i) {
    const v = d()

    assert.isTrue(v >= 0)
    assert.isTrue(v < max)
  }
}

/**
 * Assert random.uniform(min, max) returns numbers in [min, max)
 * @param d Distribution function
 */
const inMinMax = (d: distFn, min: number, max: number) => {
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.isTrue(v >= min)
    assert.isTrue(v < max)
  }
}

test('random.uniform() is in [0, 1)', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.uniform()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.isTrue(v >= 0)
    assert.isTrue(v < 1)
  }
})

test('random.uniform() with seedrandom has mean 0.5', () => {
  const r = random.clone(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  const d = r.uniform()
  const mean = calcMean(d)
  assert.closeTo(mean, 0.5, 0.05)
})

test('random.uniform() with seed has mean 0.5', () => {
  const r = random.clone('OTU2YTM0NjQ5MjM1ZTA3MTg4YjQyYjUw')
  const d = r.uniform()
  const mean = calcMean(d)
  assert.closeTo(mean, 0.5, 0.05)
})

test('random.uniform() with XOR128RNG has mean 0.5', () => {
  const r = random.clone(new XOR128RNG(3))
  const d = r.uniform()
  const mean = calcMean(d)
  assert.closeTo(mean, 0.5, 0.05)
})

test('random.uniform() with FunctionRNG has mean 0.5', () => {
  const r = random.clone(new FunctionRNG(Math.random))
  const d = r.uniform()
  const mean = calcMean(d)
  assert.closeTo(mean, 0.5, 0.05)
})

test('random.uniform() with MathRandomRNG has mean 0.5', () => {
  const r = random.clone(new MathRandomRNG())
  const d = r.uniform()
  const mean = calcMean(d)
  assert.closeTo(mean, 0.5, 0.05)
})

test('random.uniform(max) returns numbers in [0, max)', () => {
  const r = random.clone(seedrandom('ODEzYWI1MjQ2NGEwYWExOTRlZTJjYmI4'))
  const d = r.uniform(undefined, 42)
  assertZeroMax(d, 42)
})

test('random.uniform(max) with XOR128RNG returns numbers in [0, max)', () => {
  const r = random.clone(new XOR128RNG(3))
  const d = r.uniform(undefined, 42)
  assertZeroMax(d, 42)
})

test('random.uniform(max) with FunctionRNG returns numbers in [0, max)', () => {
  const r = random.clone(new FunctionRNG(Math.random))
  const d = r.uniform(undefined, 42)
  assertZeroMax(d, 42)
})

test('random.uniform(max) with MathRandomRNG returns numbers in [0, max)', () => {
  const r = random.clone(new MathRandomRNG())
  const d = r.uniform(undefined, 42)
  assertZeroMax(d, 42)
})

test('random.uniform(max) has mean max / 2', () => {
  const r = random.clone(seedrandom('NjcwNjY0MDdiNTEzMmE4Y2I0ZWYxYzNl'))
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 21, 0.5)
})

test('random.uniform(max) XOR128RNG has mean max / 2', () => {
  const r = random.clone(new XOR128RNG(3))
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 21, 0.5)
})

test('random.uniform(max) FunctionRNG  has mean max / 2', () => {
  const r = random.clone(new FunctionRNG(Math.random))
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 21, 0.5)
})

test('random.uniform(max) MathRandomRNG  has mean max / 2', () => {
  const r = random.clone(new MathRandomRNG())
  const d = r.uniform(undefined, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 21, 0.5)
})

test('random.uniform(min, max) returns numbers in [min, max)', () => {
  const r = random.clone(seedrandom('NWI0ZWQ0MDBkMGFmZGZkZGU1YjEwMThk'))
  const d = r.uniform(10, 42)
  inMinMax(d, 10, 42)
})

test('random.uniform(min, max) with XOR128RNG returns numbers in [min, max)', () => {
  const r = random.clone(new XOR128RNG(2))
  const d = r.uniform(10, 42)
  inMinMax(d, 10, 42)
})

test('random.uniform(min, max) has mean (min + max) / 2', () => {
  const r = random.clone(seedrandom('M2M2ZGFiZDdkOGUzMjkwOTM1MzQwMWRm'))
  const d = r.uniform(10, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 26, 0.5)
})

test('random.uniform(min, max) with XOR128RNG has mean (min + max) / 2', () => {
  const r = random.clone(new XOR128RNG(2))
  const d = r.uniform(10, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 26, 0.5)
})
