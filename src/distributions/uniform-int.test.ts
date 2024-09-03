import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

type distFn = () => number

/**
 * @param d Distribution function
 * @returns Mean of d
 */
export const calcMean = (d: distFn) => {
  const n = 10_000
  let sum = 0

  for (let i = 0; i < n; ++i) {
    const v = d()
    sum += v
  }

  return sum / n
}

test('random.uniformInt() with seedrandom has mean 0.5', () => {
  const r = random.clone(seedrandom('MzUyYjZjZmM4YWI5NzEwNDliZGRmOTE3'))
  const d = r.uniformInt()
  const mean = calcMean(d)
  assert.closeTo(mean, 0.5, 0.05)
})

test('random.uniformInt(max) has mean max / 2', () => {
  const r = random.clone(seedrandom('NjcwNjY0MDdiNTEzMmE4Y2I0ZWYxYzNl'))
  const d = r.uniformInt(0, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 21, 0.5)
})

test('random.uniformInt(min, max) has mean (min + max) / 2', () => {
  const r = random.clone(seedrandom('M2M2ZGFiZDdkOGUzMjkwOTM1MzQwMWRm'))
  const d = r.uniformInt(10, 42)
  const mean = calcMean(d)
  assert.closeTo(mean, 26, 0.5)
})

test('random.uniformInt(min, max) with large max', () => {
  const r = random.clone(seedrandom('YjQ2MGJiNDM3OWQ2YzUzNzA1MDdmMmQ0'))
  const min = 0
  const max = 14_206_147_658
  for (let i = 0; i < 100_000; ++i) {
    const d = r.int(min, max)
    assert.isTrue(d >= min)
    assert.isTrue(d <= max)
    assert.isTrue(Math.floor(d) === d)
  }
})

test('random.uniformInt(min, max) with non valid input', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  assert.throws(
    () => r.uniformInt(10.1, 42.1),
    'Expected number to be an integer, got 10.1'
  )
})
