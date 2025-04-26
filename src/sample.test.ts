import { assert, expect, test } from 'vitest'

import random from './random'

function range(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i)
}

test('random.sample returns the correct number of elements', () => {
  const N = 10
  const src = range(N)
  for (let n = 0; n <= N; n++) {
    const sample = random.sample(src, n)
    expect(sample.length).toEqual(n)
  }
})

test('random.sample returns subsets', () => {
  const N = 10
  const src = range(N)
  for (let n = 0; n <= N; n++) {
    const sample = random.sample(src, n)
    assert.includeMembers(src, sample)
  }
})

test('random.sample does not return duplicates', () => {
  const N = 10
  const src = range(N)
  for (let n = 0; n <= N; n++) {
    const sample = random.sample(src, n)
    const unique = new Set(sample)
    assert.equal(unique.size, sample.length)
  }
})

test(
  'random.sample returns close-to-uniform samples',
  { timeout: 10_000 },
  () => {
    const N = 10
    const repeats = 1_000_000
    const tolerance = 0.001

    const src = range(N)
    const counts = Array.from({ length: N }, () => 0)
    let total = 0
    for (let i = 0; i < repeats; i++) {
      const sample = random.sample(src, Math.floor(Math.random() * N))
      total += sample.length

      for (const v of sample) {
        counts[v]! += 1
      }
    }
    const proportions = counts.map((c) => c / total)
    for (let i = 0; i < N; i++) {
      assert.closeTo(
        proportions[i]!,
        1 / N,
        tolerance,
        `proportions: [${proportions.map((p) => p.toFixed(4)).join(', ')}]`
      )
    }
  }
)

test('random.sampler returns different samples', () => {
  const src = range(10)
  const sampler = random.sampler(src, 5)
  const samples1 = sampler()
  const samples2 = sampler()
  const samples3 = sampler()
  assert.notSameOrderedMembers(src, samples2)
  assert.notSameOrderedMembers(samples1, samples2)
  assert.notSameOrderedMembers(samples2, samples3)
})
