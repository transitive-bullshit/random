import test from 'ava'
import { ArgumentError } from 'ow'
import seedrandom from 'seedrandom'
import random from '../../src/random'

test('random.bates() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.bates()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.bates() invalid n float input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))

  const error = t.throws(
    () => {
      r.bates(1.3)
    },
    { instanceOf: ArgumentError }
  )

  t.is(error.message, 'Expected number to be an integer, got 1.3')
})

test('random.bates() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))

  const error = t.throws(
    () => {
      r.bates(-1)
    },
    { instanceOf: ArgumentError }
  )

  t.is(error.message, 'Expected number to be positive, got -1')
})
