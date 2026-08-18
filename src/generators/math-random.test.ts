import { afterEach, expect, test, vi } from 'vitest'

import { MathRandomRNG } from './math-random'

afterEach(() => {
  vi.restoreAllMocks()
})

test('MathRandomRNG forwards one call to Math.random', () => {
  const random = vi.spyOn(Math, 'random').mockReturnValue(0.625)
  const rng = new MathRandomRNG()

  expect(rng.next()).toBe(0.625)
  expect(random).toHaveBeenCalledOnce()
})

test('MathRandomRNG clones as a new wrapper over the global random source', () => {
  const random = vi
    .spyOn(Math, 'random')
    .mockReturnValueOnce(0.125)
    .mockReturnValueOnce(0.875)
  const rng = new MathRandomRNG()
  const clone = rng.clone()

  expect(rng.name).toBe('Math.random')
  expect(clone).toBeInstanceOf(MathRandomRNG)
  expect(clone).not.toBe(rng)
  expect(rng.next()).toBe(0.125)
  expect(clone.next()).toBe(0.875)
  expect(random).toHaveBeenCalledTimes(2)
})
