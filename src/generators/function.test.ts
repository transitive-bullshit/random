import { expect, test } from 'vitest'

import { FunctionRNG } from './function'

test('FunctionRNG forwards one call and preserves the source name', () => {
  let calls = 0

  function source() {
    calls += 1

    return 0.625
  }

  const rng = new FunctionRNG(source)

  expect(rng.name).toBe('source')
  expect(rng.next()).toBe(0.625)
  expect(calls).toBe(1)
})

test('FunctionRNG gives anonymous sources a useful name', () => {
  const rng = new FunctionRNG(() => 0.5)

  expect(rng.name).toBe('function')
})

test('FunctionRNG clones share the wrapped function state', () => {
  const values = [0, 1 - Number.EPSILON]
  let index = 0
  const rng = new FunctionRNG(() => values[index++]!)
  const clone = rng.clone()

  expect(clone).toBeInstanceOf(FunctionRNG)
  expect(clone).not.toBe(rng)
  expect(rng.next()).toBe(0)
  expect(clone.next()).toBe(1 - Number.EPSILON)
  expect(index).toBe(2)
})
