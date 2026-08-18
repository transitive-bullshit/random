import { afterEach, expect, test, vi } from 'vitest'

import type { RNG } from '../rng'
import { ARC4RNG } from './arc4'
import { XOR128RNG } from './xor128'
import { Xoshiro128StarStarRNG } from './xoshiro128-star-star'

const seedlessGenerators: Array<[string, () => RNG, (seed: string) => RNG]> = [
  ['ARC4RNG', () => new ARC4RNG(), (seed) => new ARC4RNG(seed)],
  ['XOR128RNG', () => new XOR128RNG(), (seed) => new XOR128RNG(seed)],
  [
    'Xoshiro128StarStarRNG',
    () => new Xoshiro128StarStarRNG(),
    (seed) => new Xoshiro128StarStarRNG(seed)
  ]
]

afterEach(() => {
  vi.restoreAllMocks()
})

test.each(seedlessGenerators)(
  '%s uses crypto.randomUUID as its implicit seed',
  (_, createImplicit, createExplicit) => {
    const seed = '00000000-0000-4000-8000-000000000000'
    const randomUUID = vi.spyOn(crypto, 'randomUUID').mockReturnValue(seed)

    const implicit = createImplicit()
    const expected = createExplicit(seed)

    expect(randomUUID).toHaveBeenCalledOnce()
    expect(Array.from({ length: 16 }, () => implicit.next())).toEqual(
      Array.from({ length: 16 }, () => expected.next())
    )
  }
)
