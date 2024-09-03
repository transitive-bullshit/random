import seedrandom from 'seedrandom'
import { expect, test } from 'vitest'

import random, { Random } from '../src/random'

test('random.clone with seedrandom rng is consistent', () => {
  const r = random.clone(seedrandom('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz'))
  const d = r.uniform()
  const o: number[] = []
  for (let i = 0; i < 100; ++i) {
    const v = d()
    o.push(v)
  }

  expect(o).toMatchSnapshot()
})

test('random.clone with string seed is consistent', () => {
  const r = random.clone('MDUzNzM5ZGQwYWZlNWIzNjI5MDYwNWNm')
  const d = r.normal()
  const o: number[] = []
  for (let i = 0; i < 100; ++i) {
    const v = d()
    o.push(v)
  }

  expect(o).toMatchSnapshot()
})

test('Random constructor', () => {
  const rng = new Random()
  expect(rng).toBeDefined()

  const rng2 = new Random(seedrandom('my-seed-string'))
  expect(rng2).toBeDefined()

  const rng3 = new Random(Math.random)
  expect(rng3).toBeDefined()

  const rng4 = new Random('example--seed-string')
  expect(rng4).toBeDefined()
})
