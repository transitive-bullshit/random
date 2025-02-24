import seedrandom from 'seedrandom'
import { assert, expect, test } from 'vitest'

import random, { Random } from '../src/random'
import { XOR128RNG } from './generators'

test('random.clone with seedrandom rng is consistent', () => {
  const r = random.clone(seedrandom('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz'))
  const d = r.uniform()
  const o: number[] = []
  for (let i = 0; i < 10; ++i) {
    const v = d()
    o.push(v)
  }

  expect(o).toMatchSnapshot()
})

test('random.clone with string seed is consistent', () => {
  const r = random.clone('MDUzNzM5ZGQwYWZlNWIzNjI5MDYwNWNm')
  const d = r.normal()
  const o: number[] = []
  for (let i = 0; i < 10; ++i) {
    const v = d()
    o.push(v)
  }

  expect(o).toMatchSnapshot()
})

test('Random constructor', () => {
  const rng = new Random()
  expect(rng.rng.name).toEqual('Math.random')

  const rng2 = new Random(seedrandom('my-seed-string'))
  expect(rng2.rng.name).toEqual('prng')

  const rng3 = new Random(Math.random)
  expect(rng3.rng.name).toEqual('random')

  const rng4 = new Random('example-seed-string')
  expect(rng4.rng.name).toEqual('arc4')
})

test('random seed consistency', () => {
  let value = 0

  for (let i = 0; i < 10; ++i) {
    const rng = new Random(seedrandom('my-seed'))
    if (i <= 0) {
      value = rng.float()
    } else {
      assert.equal(value, rng.float())
    }
  }

  for (let i = 0; i < 10; ++i) {
    const rng = new Random('my-seed')
    if (i <= 0) {
      value = rng.float()
    } else {
      assert.equal(value, rng.float())
    }
  }

  for (let i = 0; i < 10; ++i) {
    const rng = new Random(42)
    if (i <= 0) {
      value = rng.float()
    } else {
      assert.equal(value, rng.float())
    }
  }

  for (let i = 0; i < 10; ++i) {
    const rng = new Random('25')
    if (i <= 0) {
      value = rng.float()
    } else {
      assert.equal(value, rng.float())
    }
  }
})

test('random.use() different seeds produce different values', () => {
  const n = 1100
  const length = 10

  random.use('25')
  const values0 = Array.from({ length }).map(() => random.int(n))

  random.use('abcdef')
  const values1 = Array.from({ length }).map(() => random.int(n))
  assert.notDeepEqual(values0, values1)

  random.use('abcdefxyz')
  const values2 = Array.from({ length }).map(() => random.int(n))
  assert.notDeepEqual(values0, values2)
  assert.notDeepEqual(values1, values2)

  random.use('25xyz')
  const values3 = Array.from({ length }).map(() => random.int(n))
  assert.notDeepEqual(values0, values3)
  assert.notDeepEqual(values1, values3)
  assert.notDeepEqual(values2, values3)

  random.use('25')
  const values4 = Array.from({ length }).map(() => random.int(n))
  assert.deepEqual(values0, values4)

  random.use('abcdef')
  const values5 = Array.from({ length }).map(() => random.int(n))
  assert.deepEqual(values1, values5)
})

test('random.use() XOR128RNG different seeds produce different values', () => {
  const r = new Random()
  const n = 1100
  const length = 10

  r.use(new XOR128RNG('25'))
  const values0 = Array.from({ length }).map(() => r.int(n))

  r.use(new XOR128RNG('abcdef'))
  const values1 = Array.from({ length }).map(() => r.int(n))
  assert.notDeepEqual(values0, values1)

  r.use(new XOR128RNG('abcdefxyz'))
  const values2 = Array.from({ length }).map(() => r.int(n))
  assert.notDeepEqual(values0, values2)
  assert.notDeepEqual(values1, values2)

  r.use(new XOR128RNG('25xyz'))
  const values3 = Array.from({ length }).map(() => r.int(n))
  assert.notDeepEqual(values0, values3)
  assert.notDeepEqual(values1, values3)
  assert.notDeepEqual(values2, values3)

  r.use(new XOR128RNG('25'))
  const values4 = Array.from({ length }).map(() => r.int(n))
  assert.deepEqual(values0, values4)

  r.use(new XOR128RNG('abcdef'))
  const values5 = Array.from({ length }).map(() => r.int(n))
  assert.deepEqual(values1, values5)
})

test('new Random() uses a different seed each time', () => {
  const n = 1100
  const length = 10

  let r = new Random()
  const values0 = Array.from({ length }).map(() => r.int(n))

  r = new Random()
  const values1 = Array.from({ length }).map(() => r.int(n))
  assert.notDeepEqual(values0, values1)

  r = new Random()
  const values2 = Array.from({ length }).map(() => r.int(n))
  assert.notDeepEqual(values0, values2)
  assert.notDeepEqual(values1, values2)

  r = new Random()
  const values3 = Array.from({ length }).map(() => r.int(n))
  assert.notDeepEqual(values0, values3)
  assert.notDeepEqual(values1, values3)
  assert.notDeepEqual(values2, values3)
})
