import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'
import { weibull } from './weibull'

test('weibull() produces numbers', () => {
  const r = random.clone(seedrandom('ylYKcdapIWnALomPSVQGzjCaZMTFXhtK'))
  const d = weibull(r, 1.0, 1.0)
  for (let i = 0; i < 10_000; ++i) {
    const v = d()
    assert.equal(typeof v, 'number')
  }
})

test('weibull() invalid negative lambda input', () => {
  const r = random.clone(seedrandom('SUtZekGfHpZfzeWJqDVoJxyiXToNdeJM'))
  assert.throws(
    () => weibull(r, 0, 1),
    'Expected number to be greater than 0, got 0'
  )
  assert.throws(
    () => weibull(r, -1, 1),
    'Expected number to be greater than 0, got -1'
  )
})

test('weibull() invalid negative k input', () => {
  const r = random.clone(seedrandom('SUtZekGfHpZfzeWJqDVoJxyiXToNdeJM'))
  assert.throws(
    () => weibull(r, 1, 0),
    'Expected number to be greater than 0, got 0'
  )
  assert.throws(
    () => weibull(r, 1, -1),
    'Expected number to be greater than 0, got -1'
  )
})
