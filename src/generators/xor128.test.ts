import seedrandom from 'seedrandom'
import { expect, test } from 'vitest'

import { XOR128RNG } from './xor128'

const UINT32_RANGE = 0x1_00_00_00_00
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

test('XOR128RNG matches the canonical Marsaglia xor128 vector', () => {
  const rng = new XOR128RNG(1)

  rng.x = 123_456_789
  rng.y = 362_436_069
  rng.z = 521_288_629
  rng.w = 88_675_123

  const expected = [
    3_701_687_786, 458_299_110, 2_500_872_618, 3_633_119_408, 516_391_518,
    2_377_269_574, 2_599_949_379, 717_229_868, 137_866_584, 395_339_113,
    1_301_295_572, 1_728_310_821, 3_538_670_320, 1_187_274_473, 2_316_753_268,
    4_061_953_237
  ]

  expect(
    Array.from({ length: expected.length }, () => rng.next() * UINT32_RANGE)
  ).toEqual(expected)
})

test.each([
  { name: 'ASCII string', seed: 'test-seed' },
  { name: 'Unicode string', seed: '雪☃️🚀' },
  { name: 'long string', seed: 'long-seed-'.repeat(40) },
  { name: 'integer', seed: 1 }
])('XOR128RNG matches seedrandom.xor128 for a $name seed', ({ seed }) => {
  const actual = new XOR128RNG(seed)
  const seedrandomXor128 = seedrandom.xor128 as unknown as (
    value: string | number
  ) => () => number
  const expected = seedrandomXor128(seed)

  expect(valuesAt(() => actual.next())).toEqual(valuesAt(expected))
})

test.each([0, '', '\0'])(
  'XOR128RNG escapes the all-zero state for seed %j',
  (seed) => {
    const rng = new XOR128RNG(seed)
    const values = Array.from({ length: 16 }, () => rng.next())

    expect(values.some((value) => value !== 0)).toBe(true)
  }
)
