import seedrandom from 'seedrandom'
import { assert, expect, test } from 'vitest'

import random, { Random } from '../src/random'

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
})
