import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import type { SeedOrRNG } from '../types'
import { FunctionRNG } from '../../src/generators/function'
import { MathRandomRNG } from '../../src/generators/math-random'
import { XOR128RNG } from '../../src/generators/xor128'
import random from '../random'

test('random.normal() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.normal()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.isNumber(v)
  }
})

const meanN = <T extends SeedOrRNG>(t: T) => {
  const r = random.clone(t)
  const d = r.normal(120)
  let sum = 0

  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    sum += v
  }
  return sum / 10_000
}

test('random.normal(120) has mean 120', () => {
  const mean = meanN(0)
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with seedrandom has mean 120', () => {
  const mean = meanN(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with seed has mean 120', () => {
  const mean = meanN('YzNlNmVhOTg0MjZkMTNhNzE2NDc3Mjkw')
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with XOR128RNG has mean 120', () => {
  const mean = meanN(new XOR128RNG(100))
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with FunctionRNG has mean 120', () => {
  const mean = meanN(new FunctionRNG(Math.random))
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with MathRandomRNG has mean 120', () => {
  const mean = meanN(new MathRandomRNG())
  assert.closeTo(mean, 120, 0.5)
})
