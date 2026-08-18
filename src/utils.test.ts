import { expect, test } from 'vitest'

import { FunctionRNG, Xoshiro128StarStarRNG } from './generators'
import { createRNG } from './utils'

test('createRNG dispatches every supported input through the expected adapter', () => {
  const fn = () => 0.25
  const existing = new Xoshiro128StarStarRNG('existing')

  expect(createRNG('seed')).toBeInstanceOf(Xoshiro128StarStarRNG)
  expect(createRNG(42)).toBeInstanceOf(Xoshiro128StarStarRNG)
  expect(createRNG(fn)).toBeInstanceOf(FunctionRNG)
  expect(createRNG(fn).next()).toBe(0.25)
  expect(createRNG(existing)).toBe(existing)
})

test.each([null, [], {}, true, 1n, Symbol('seed')])(
  'createRNG rejects unsupported runtime input case %# consistently',
  (value) => {
    expect(() => createRNG(value as never)).toThrowError(
      /^Invalid seed or RNG:/
    )
  }
)
