import { expect, test } from 'vitest'

import type { Seed } from '../types'
import { Xoshiro128StarStarRNG } from './xoshiro128-star-star'

type State = [number, number, number, number]

const seedStateFixtures: Array<{
  name: string
  seed: Seed
  state: State
}> = [
  {
    name: 'canonical cyrb128 example',
    seed: 'apples',
    state: [0x50ac_d062, 0x827f_2438, 0x0b31_24f7, 0xfbfa_0716]
  },
  {
    name: 'empty string',
    seed: '',
    state: [0x027a_e52e, 0xcfc7_9621, 0x5593_990d, 0x4b41_437c]
  },
  {
    name: 'NUL character',
    seed: '\0',
    state: [0xf880_0dc9, 0x0c22_1d14, 0x9643_f545, 0x1853_2e40]
  },
  {
    name: 'UTF-16 surrogate pair',
    seed: '💩',
    state: [0x7be4_3d09, 0x8eb5_e490, 0x4b43_76d9, 0x1a90_2326]
  },
  {
    name: 'number beyond uint32',
    seed: 2 ** 32,
    state: [0xc5e7_ad98, 0x9838_e9ab, 0xf2cb_22f0, 0x1115_3060]
  },
  {
    name: 'maximum safe integer',
    seed: Number.MAX_SAFE_INTEGER,
    state: [0xb7bd_2158, 0x588d_9e3f, 0x81b5_cee7, 0x86ad_0a8f]
  },
  {
    name: 'fractional number',
    seed: 1.9,
    state: [0x631b_28b3, 0x7dcb_4d5c, 0xfeff_5abf, 0x06f2_7965]
  }
]

class ReferenceStateRNG extends Xoshiro128StarStarRNG {
  constructor(state: State) {
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

class InspectableSeedRNG extends Xoshiro128StarStarRNG {
  setStateForTest(state: State): void {
    this.setState(state)
  }

  stateForTest(): State {
    return [this.s0, this.s1, this.s2, this.s3]
  }
}

class ScriptedUint32RNG extends Xoshiro128StarStarRNG {
  private offset = 0

  constructor(private readonly values: readonly number[]) {
    super('scripted-uint32')
  }

  get consumedForTest(): number {
    return this.offset
  }

  protected override nextUint32(): number {
    const value = this.values[this.offset]

    if (value === undefined) {
      throw new Error('scripted uint32 sequence exhausted')
    }

    this.offset += 1

    return value
  }
}

function sample(seed: string | number, count: number): number[] {
  const rng = new Xoshiro128StarStarRNG(seed)

  return Array.from({ length: count }, () => rng.next())
}

test.each(seedStateFixtures)(
  'Xoshiro128StarStarRNG expands $name with cyrb128',
  ({ seed, state }) => {
    expect(new InspectableSeedRNG(seed).stateForTest()).toEqual(state)
  }
)

test.each([
  { equivalent: '1', name: 'numeric and string seeds', seed: 1 },
  { equivalent: 0, name: 'positive and negative zero', seed: -0 }
])(
  'Xoshiro128StarStarRNG preserves String(seed) equivalence for $name',
  ({ equivalent, seed }) => {
    expect(new InspectableSeedRNG(seed).stateForTest()).toEqual(
      new InspectableSeedRNG(equivalent).stateForTest()
    )
  }
)

test.each([
  { expected: 0, name: 'minimum', words: [0, 0] },
  {
    expected: 1 - 2 ** -53,
    name: 'maximum',
    words: [0xffff_ffff, 0xffff_ffff]
  },
  { expected: 2 ** -27, name: 'high-word unit', words: [0x20, 0] },
  { expected: 2 ** -53, name: 'low-word unit', words: [0, 0x40] },
  { expected: 0, name: 'discarded low bits', words: [0x1f, 0x3f] }
])(
  'Xoshiro128StarStarRNG constructs the exact $name 53-bit value',
  ({ expected, words }) => {
    const rng = new ScriptedUint32RNG(words)

    expect(rng.next()).toBe(expected)
    expect(rng.consumedForTest).toBe(2)
  }
)

test('Xoshiro128StarStarRNG replaces the absorbing all-zero state', () => {
  const rng = new InspectableSeedRNG('all-zero-state')

  rng.setStateForTest([0, 0, 0, 0])

  expect(rng.stateForTest()).toEqual([0x6d2b_79f5, 0, 0, 0])
})

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
    values.every((value) => Number.isInteger(value * 0x20_00_00_00_00_00_00))
  ).toBe(true)
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
