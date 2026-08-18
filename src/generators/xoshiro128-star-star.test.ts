import { expect, test } from 'vitest'

import { Xoshiro128StarStarRNG } from './xoshiro128-star-star'

class ReferenceStateRNG extends Xoshiro128StarStarRNG {
  constructor(state: [number, number, number, number]) {
    super('reference-vector')

    this.s0 = state[0]
    this.s1 = state[1]
    this.s2 = state[2]
    this.s3 = state[3]
  }

  nextUint32ForTest() {
    return this.nextUint32()
  }
}

function sample(seed: string | number, count: number): number[] {
  const rng = new Xoshiro128StarStarRNG(seed)

  return Array.from({ length: count }, () => rng.next())
}

test('Xoshiro128StarStarRNG matches the reference transition and output', () => {
  const rng = new ReferenceStateRNG([1, 2, 3, 4])
  const actual = Array.from({ length: 12 }, () => rng.nextUint32ForTest())

  expect(actual).toEqual([
    0x0000_2d00, 0x0000_0000, 0x005a_7080, 0x0438_9d80, 0x7919_9d9b,
    0x6196_3b24, 0x4cb9_b57a, 0xde9d_7431, 0xde45_8f35, 0xfdce_1a54,
    0x1422_dcbd, 0x7fb4_d43b
  ])
})

test('Xoshiro128StarStarRNG produces a stable sequence for a seed', () => {
  expect(sample('test-seed', 8)).toEqual([
    0.475_519_173_624_951, 0.398_543_474_105_149_1, 0.466_898_762_385_212_1,
    0.327_685_613_347_927_34, 0.851_115_147_516_386_8,
    0.030_538_365_793_194_244, 0.370_837_789_251_936_9, 0.779_651_289_308_063_2
  ])
})

test('Xoshiro128StarStarRNG returns 53-bit values in [0, 1)', () => {
  const values = sample('test-seed', 1000)

  expect(values.every((value) => value >= 0 && value < 1)).toBe(true)
  expect(
    values.some((value) => !Number.isInteger(value * 0x1_00_00_00_00))
  ).toBe(true)
})

test('Xoshiro128StarStarRNG distinguishes seeds beyond 32 bits', () => {
  const seeds = [0, 2 ** 32, '', '\0', '\0\0', 1, 1.9]
  const firstValues = seeds.map((seed) =>
    new Xoshiro128StarStarRNG(seed).next()
  )

  expect(new Set(firstValues).size).toBe(seeds.length)
})
