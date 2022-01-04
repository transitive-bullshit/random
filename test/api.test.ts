import test from 'ava'
import RNGFunction from '../src/generators/function'
import RNGMathRandom from '../src/generators/math-random'
import RNGXOR128 from '../src/generators/xor128'
import random, { Random, RNGFactory } from '../src/random'

test('construct Random with RNGMathRandom', (t) => {
  const rng = new Random(new RNGMathRandom())
  t.is(rng._rng.name, 'default')
})

test('construct Random with RNGFunction', (t) => {
  const rng = new Random(new RNGFunction(Math.random))
  t.is(rng._rng.name, 'function')
})

test('construct Random with RNGXOR128', (t) => {
  const rng = new Random(new RNGXOR128(1))
  t.is(rng._rng.name, 'xor128')
})

test('construct Random with RNGFactory', (t) => {
  const rng = new Random(RNGFactory(Math.random))
  t.is(rng._rng.name, 'function')
})

test('random defaults to RNGMathRandom', (t) => {
  t.is(random._rng.name, 'default')
})

test('random.clone with string seed argument', (t) => {
  const rng = random.clone('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk')
  t.is(rng._rng.name, 'function')
})

test('random.clone with number seed argument', (t) => {
  const rng = random.clone(1)
  t.is(rng._rng.name, 'function')
})

test('random.use', (t) => {
  random.use('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk')
  t.is(random._rng.name, 'function')
})

test('random.next generates [0, 1)', (t) => {
  const r = random.clone('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk')
  for (let i = 0; i < 10000; ++i) {
    const v = r.next()
    t.true(v >= 0)
    t.true(v < 1)
  }
})
