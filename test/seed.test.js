import test from 'ava'
import seedrandom from 'seedrandom'

import random from '..'

test('random.clone witth a seed is consistent', (t) => {
  const r = random.clone(seedrandom('ZjExZDczNWQxY2NlZjUzYmRiZWU0ZGIz'))
  const d = r.uniform()
  const o = []
  for (let i = 0; i < 100; ++i) {
    const v = d()
    o.push(v)
  }

  t.snapshot(o)
})
