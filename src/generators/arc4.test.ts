import seedrandom from 'seedrandom'
import { expect, test } from 'vitest'

import { ARC4RNG } from './arc4'

function sample(seed: string | number, count: number): number[] {
  const rng = new ARC4RNG(seed)

  return Array.from({ length: count }, () => rng.next())
}

const CHECKPOINTS = [0, 63, 255, 999]

function valuesAt(next: () => number, indexes = CHECKPOINTS): number[] {
  const values: number[] = []
  let checkpoint = 0

  for (let index = 0; index <= indexes.at(-1)!; index += 1) {
    const value = next()

    if (index === indexes[checkpoint]) {
      values.push(value)
      checkpoint += 1
    }
  }

  return values
}

test('ARC4RNG produces repeatable sequences for the same seed', () => {
  expect(sample('test-seed', 100)).toEqual(sample('test-seed', 100))
})

test('ARC4RNG returns values in the interval [0, 1)', () => {
  const values = sample('test-seed', 1000)

  expect(values.every((value) => value >= 0 && value < 1)).toBe(true)
})

test('ARC4RNG produces distinct first values for distinct string seeds', () => {
  const seeds = Array.from({ length: 100 }, (_, index) => `test-seed-${index}`)
  const firstValues = seeds.map((seed) => new ARC4RNG(seed).next())
  const collisionRate = 1 - new Set(firstValues).size / firstValues.length

  expect(collisionRate).toBeLessThan(0.05)
})

test.each([
  { name: 'empty', seed: '' },
  { name: 'NUL', seed: '\0' },
  { name: 'Unicode', seed: '雪☃️🚀' },
  { name: 'long', seed: 'long-seed-'.repeat(40) }
])(
  'ARC4RNG matches seedrandom at distant checkpoints for a $name seed',
  ({ seed }) => {
    const actual = new ARC4RNG(seed)
    const expected = seedrandom(seed)

    expect(valuesAt(() => actual.next())).toEqual(valuesAt(expected))
  }
)
