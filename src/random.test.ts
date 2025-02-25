import { assert, expect, test } from 'vitest'

import random, { Random } from '../src/random'

function range(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i)
}

test('Shuffle returns the same elements', () => {
  const src = range(20)
  const shuffled = random.shuffle(src)
  assert.sameMembers(shuffled, src)
  expect(shuffled.length).toEqual(src.length)
})

test('Shuffle returns the elements in a different order', () => {
  const src = range(50)
  // Pick a seed we know doesn't shuffle everything into the same order
  // (which is very unlikely)
  const rng = new Random('test-seed')
  const shuffled = rng.shuffle(src)
  assert.sameMembers(shuffled, src)
  assert.notSameOrderedMembers(shuffled, src)
})

test('Multiple shuffled copies', () => {
  const src = range(10)
  const shuffler = random.shuffler(src)
  const copy1 = shuffler()
  const copy2 = shuffler()
  const copy3 = shuffler()
  assert.sameMembers(src, copy1)
  assert.sameMembers(src, copy2)
  assert.sameMembers(src, copy3)
  assert.notSameOrderedMembers(src, copy1)
  assert.notSameOrderedMembers(copy1, copy2)
  assert.notSameOrderedMembers(copy2, copy3)
})
