import test from 'ava'
import seedrandom from 'seedrandom'

import random from '../src/random'

test('random.clone with a seed is consistent', (t) => {
  const r = random.clone(seedrandom('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz'))
  const d = r.uniform()
  const o = []
  for (let i = 0; i < 100; ++i) {
    const v = d()
    o.push(v)
  }

  t.snapshot(o)
})

test('random.clone with a string seed is consistent', (t) => {
  const r = random.clone('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz')
  const d = r.uniform()
  const o = []
  for (let i = 0; i < 100; ++i) {
    const v = d()
    o.push(v)
  }

  t.snapshot(o)
})
