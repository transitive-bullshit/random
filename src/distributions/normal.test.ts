import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import type { SeedType } from '../types'
import { RNGFunction } from '../../src/generators/function'
import { RNGMathRandom } from '../../src/generators/math-random'
import { RNGXOR128 } from '../../src/generators/xor128'
import random from '../random'

test('random.normal() produces numbers', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.normal()
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

const meanN = <T extends SeedType>(t: T) => {
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
  const mean = meanN(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with RNGXOR128 has mean 120', () => {
  const mean = meanN(new RNGXOR128(100))
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with RNGFunction has mean 120', () => {
  const mean = meanN(new RNGFunction(Math.random))
  assert.closeTo(mean, 120, 0.5)
})

test('random.normal(120) with RNGMathRandom has mean 120', () => {
  const mean = meanN(new RNGMathRandom())
  assert.closeTo(mean, 120, 0.5)
})
