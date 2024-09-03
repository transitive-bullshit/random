import seedrandom from 'seedrandom'
import { expect, test } from 'vitest'

import random from '../src/random'

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
