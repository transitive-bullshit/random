import seedrandom from 'seedrandom'
import { assert, expect, test } from 'vitest'

import {
  ARC4RNG,
  FunctionRNG,
  MathRandomRNG,
  XOR128RNG,
  Xoshiro128StarStarRNG
} from './generators'
import type { RNG } from './rng'
import random, { Random } from './random'

const builtInRNGs: Array<[string, () => RNG]> = [
  ['ARC4RNG', () => new ARC4RNG('test-seed')],
  ['XOR128RNG', () => new XOR128RNG('test-seed')],
  ['Xoshiro128StarStarRNG', () => new Xoshiro128StarStarRNG('test-seed')],
  [
    'FunctionRNG',
    () => {
      let index = 0
      const values = [0, 0.25, 0.5, 0.75, 1 - Number.EPSILON]

      return new FunctionRNG(() => values[index++ % values.length]!)
    }
  ],
  ['MathRandomRNG', () => new MathRandomRNG()]
]

const seededBuiltInRNGs: Array<[string, (seed: string) => RNG]> = [
  ['ARC4RNG', (seed) => new ARC4RNG(seed)],
  ['XOR128RNG', (seed) => new XOR128RNG(seed)],
  ['Xoshiro128StarStarRNG', (seed) => new Xoshiro128StarStarRNG(seed)]
]

function range(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i)
}

function sample(random: Random, count: number): number[] {
  return Array.from({ length: count }, () => random.float())
}

test('ARC4RNG matches the ARC4 sequence from seedrandom', () => {
  const actual = new Random(new ARC4RNG('test-seed'))
  const expected = seedrandom('test-seed')

  expect(sample(actual, 10)).toEqual(
    Array.from({ length: 10 }, () => expected())
  )
})

test('Seeded Random uses xoshiro128**', () => {
  const actual = new Random('test-seed')

  expect(actual.rng).toBeInstanceOf(Xoshiro128StarStarRNG)
  expect(actual.rng.name).toBe('xoshiro128**')
})

test('Seeded Random produces distinct first uniform values for distinct string seeds', () => {
  const seeds = Array.from({ length: 100 }, (_, index) => `test-seed-${index}`)
  const firstValues = seeds.map((seed) => new Random(seed).uniform()())
  const collisionRate = 1 - new Set(firstValues).size / firstValues.length

  expect(collisionRate).toBeLessThan(0.05)
})

test.each([0, '', '\0'])(
  'Random with XOR128RNG seed %j produces a nonconstant float sequence',
  (seed) => {
    const values = sample(new Random(new XOR128RNG(seed)), 100)

    expect(new Set(values).size).toBeGreaterThan(1)
  }
)

test.each(builtInRNGs)(
  'Random with %s returns next, uniform, and float samples in [0, 1)',
  (_, createRNG) => {
    const instance = new Random(createRNG())
    const uniform = instance.uniform()
    const values = [
      ...Array.from({ length: 100 }, () => instance.next()),
      ...Array.from({ length: 100 }, uniform),
      ...sample(instance, 100)
    ]

    expect(values.every((value) => value >= 0 && value < 1)).toBe(true)
  }
)

test.each(builtInRNGs)(
  'Random with %s respects uniform and float bounds',
  (_, createRNG) => {
    const instance = new Random(createRNG())
    const uniform = instance.uniform(-10, 42)
    const values = [
      ...Array.from({ length: 100 }, uniform),
      ...Array.from({ length: 100 }, () => instance.float(-10, 42))
    ]

    expect(values.every((value) => value >= -10 && value < 42)).toBe(true)
  }
)

test.each(seededBuiltInRNGs)(
  'Random with %s produces repeatable float sequences for the same seed',
  (_, createRNG) => {
    expect(sample(new Random(createRNG('test-seed')), 100)).toEqual(
      sample(new Random(createRNG('test-seed')), 100)
    )
  }
)

test.each(seededBuiltInRNGs)(
  'Random with %s produces distinct first uniform values for distinct string seeds',
  (_, createRNG) => {
    const seeds = Array.from(
      { length: 100 },
      (_, index) => `test-seed-${index}`
    )
    const firstValues = seeds.map((seed) =>
      new Random(createRNG(seed)).uniform()()
    )
    const collisionRate = 1 - new Set(firstValues).size / firstValues.length

    expect(collisionRate).toBeLessThan(0.05)
  }
)

test('Shuffle returns the same elements', () => {
  const src = range(20)
  const shuffled = random.shuffle(src)
  assert.sameMembers(shuffled, src)
  expect(shuffled.length).toEqual(src.length)
})

test('Shuffle returns the elements in a different order', () => {
  const src = range(50)
  // Pick a seed we know doesn't shuffle everything into the same order
  // (which is very unlikely)
  const rng = new Random('test-seed')
  const shuffled = rng.shuffle(src)
  assert.sameMembers(shuffled, src)
  assert.notSameOrderedMembers(shuffled, src)
})

test('Multiple shuffled copies', () => {
  const src = range(10)
  const shuffler = random.shuffler(src)
  const copy1 = shuffler()
  const copy2 = shuffler()
  const copy3 = shuffler()
  assert.sameMembers(src, copy1)
  assert.sameMembers(src, copy2)
  assert.sameMembers(src, copy3)
  assert.notSameOrderedMembers(src, copy1)
  assert.notSameOrderedMembers(copy1, copy2)
  assert.notSameOrderedMembers(copy2, copy3)
})
