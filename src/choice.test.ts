import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from './random'

type DistFn = () => number
type TestFn = (sample: number) => void

/**
 * @param d Distribution function
 * @returns Mean of d
 */
const calcMean = (d: DistFn, testFn: TestFn) => {
  const n = 10_000
  let sum = 0

  for (let i = 0; i < n; ++i) {
    const v = d()
    if (testFn) testFn(v)
    sum += v
  }

  return sum / n
}

test(
  'random.choice() with seedrandom has correct uniform mean selection',
  {
    timeout: 10_000
  },
  () => {
    const r = random.clone(seedrandom('MjEzNGFlYzBiMDFmYjNjY2NhMTY2YzEy'))
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const d = () => r.choice(a)!
    const mean = calcMean(d, (v) => {
      assert.isTrue(a.includes(v))
    })
    assert.closeTo(mean, 5.5, 0.05)
  }
)

test(
  'random.choice() produces valid output for mixed arrays',
  {
    timeout: 10_000
  },
  () => {
    const r = random.clone('NWNmMmU2MzVmNWY5MzQ1MzdhZjc0M2Zm')
    const a = [13, 'foo', { example: true }, false, null, 14.152]
    for (let i = 0; i < 1_000_000; ++i) {
      const s = r.choice(a)!
      assert.isTrue(a.includes(s))
    }
  }
)

test(
  'random.choice() produces undefined for empty arrays',
  {
    timeout: 10_000
  },
  () => {
    const r = random.clone('MzdkYTRkNTE4YWVjYThiNzkwMGI5YzA4')
    const a: any[] = []
    for (let i = 0; i < 1000; ++i) {
      const s = r.choice(a)
      assert.equal(s, undefined)
    }
  }
)

test('random.choice() with invalid input', () => {
  const r = random.clone('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk')
  assert.throws(
    () => r.choice(5 as any),
    'Random.choice expected input to be an array, got number'
  )

  assert.throws(
    () => r.choice({ foo: true } as any),
    'Random.choice expected input to be an array, got object'
  )
})

test(
  'random.choice() with weights has correct weighted mean selection',
  {
    timeout: 10_000
  },
  () => {
    const r = random.clone(seedrandom('weighted-choice-test-1'))
    const a = [1, 2, 3, 4]
    // Weights heavily favor value 4 (weight 10 vs 1 for others)
    const weights = [1, 1, 1, 10]
    const counts = new Map<number, number>()
    const n = 100_000

    for (let i = 0; i < n; i++) {
      const choice = r.choice(a, weights)!
      counts.set(choice, (counts.get(choice) || 0) + 1)
    }

    // Value 4 should be chosen about 10/13 ≈ 76.9% of the time
    const frequency4 = (counts.get(4) || 0) / n
    assert.closeTo(frequency4, 10 / 13, 0.01)

    // Values 1, 2, 3 should each be chosen about 1/13 ≈ 7.7% of the time
    for (const value of [1, 2, 3]) {
      const frequency = (counts.get(value) || 0) / n
      assert.closeTo(frequency, 1 / 13, 0.01)
    }
  }
)

test(
  'random.choice() with equal weights behaves like uniform selection',
  {
    timeout: 10_000
  },
  () => {
    const r = random.clone(seedrandom('weighted-choice-test-2'))
    const a = [1, 2, 3, 4, 5]
    const weights = [1, 1, 1, 1, 1]
    const d = () => r.choice(a, weights)!
    const mean = calcMean(d, (v) => {
      assert.isTrue(a.includes(v))
    })
    assert.closeTo(mean, 3, 0.05)
  }
)

test('random.choice() with weights validation', () => {
  const r = random.clone('weighted-choice-validation')
  const a = [1, 2, 3]

  // Wrong weights type
  assert.throws(
    () => r.choice(a, 'invalid' as any),
    'Random.choice expected weights to be an array, got string'
  )

  // Mismatched array lengths
  assert.throws(
    () => r.choice(a, [1, 2]),
    'Random.choice expected weights array length (2) to match array length (3)'
  )

  // Negative weight
  assert.throws(
    () => r.choice(a, [1, -1, 2]),
    'Random.choice expected all weights to be non-negative finite numbers, got -1 at index 1'
  )

  // Non-finite weight
  assert.throws(
    () => r.choice(a, [1, Infinity, 2]),
    'Random.choice expected all weights to be non-negative finite numbers, got Infinity at index 1'
  )

  // NaN weight
  assert.throws(
    () => r.choice(a, [1, Number.NaN, 2]),
    'Random.choice expected all weights to be non-negative finite numbers, got NaN at index 1'
  )

  // All zero weights
  assert.throws(
    () => r.choice(a, [0, 0, 0]),
    'Random.choice expected at least one positive weight, got all zeros'
  )

  // Non-number weight
  assert.throws(
    () => r.choice(a, [1, 'invalid' as any, 2]),
    'Random.choice expected all weights to be non-negative finite numbers, got invalid at index 1'
  )
})

test('random.choice() with weights and empty array', () => {
  const r = random.clone('weighted-choice-empty')
  const a: number[] = []
  const weights: number[] = []

  const result = r.choice(a, weights)
  assert.equal(result, undefined)
})

test('random.choice() with single-item weighted array', () => {
  const r = random.clone('weighted-choice-single')
  const a = ['only-item']
  const weights = [5.5]

  for (let i = 0; i < 100; i++) {
    const result = r.choice(a, weights)
    assert.equal(result, 'only-item')
  }
})

test(
  'random.choice() with zero weights mixed with positive weights',
  {
    timeout: 10_000
  },
  () => {
    const r = random.clone(seedrandom('weighted-choice-test-3'))
    const a = [1, 2, 3, 4]
    // Only items 2 and 4 have positive weights
    const weights = [0, 3, 0, 7]
    const counts = new Map<number, number>()
    const n = 10_000

    for (let i = 0; i < n; i++) {
      const choice = r.choice(a, weights)!
      counts.set(choice, (counts.get(choice) || 0) + 1)
    }

    // Items 1 and 3 should never be chosen
    assert.equal(counts.get(1) || 0, 0)
    assert.equal(counts.get(3) || 0, 0)

    // Item 2 should be chosen 3/10 = 30% of the time
    const frequency2 = (counts.get(2) || 0) / n
    assert.closeTo(frequency2, 0.3, 0.01)

    // Item 4 should be chosen 7/10 = 70% of the time
    const frequency4 = (counts.get(4) || 0) / n
    assert.closeTo(frequency4, 0.7, 0.01)
  }
)
