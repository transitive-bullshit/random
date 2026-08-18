import type { Seed, SeedOrRNG } from './types'
import { FunctionRNG } from './generators/function'
import { Xoshiro128StarStarRNG } from './generators/xoshiro128-star-star'
import { RNG } from './rng'

export function createRNG(seedOrRNG?: SeedOrRNG): RNG {
  switch (typeof seedOrRNG) {
    case 'object':
      if (seedOrRNG instanceof RNG) {
        return seedOrRNG
      }
      break

    case 'function':
      return new FunctionRNG(seedOrRNG)

    default:
      return new Xoshiro128StarStarRNG(seedOrRNG)
  }

  throw new TypeError(`Invalid seed or RNG: ${seedOrRNG as string}`)
}

/**
 * Mixes a string seed into a key that is an array of integers, and returns a
 * shortened string seed that is equivalent to the result key.
 */
export function mixKey(seed: Seed, key: number[]): number[] {
  const seedStr = `${seed}`
  let smear = 0
  let j = 0

  while (j < seedStr.length) {
    key[0xff & j] =
      0xff & ((smear ^= (key[0xff & j] ?? 0) * 19) + seedStr.charCodeAt(j++))
  }

  if (!key.length) {
    return [0]
  }

  return key
}

export function shuffleInPlace<T>(gen: RNG, array: Array<T>) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(gen.next() * (i + 1))
    const tmp = array[i]
    array[i] = array[j] as T
    array[j] = tmp as T
  }
}

/**
 * Fisher-Yates sampling without replacement
 * O(k) time and space, by using a hash table instead of a full copy of the array
 * see https://arxiv.org/pdf/2104.05091 Algorithm 2
 */
export function sparseFisherYates<T>(
  gen: RNG,
  array: Array<T>,
  k: number
): T[] {
  const H = new Map<number, number>() // stores swapped indices
  const lastIndex = array.length - 1
  const result: T[] = Array.from({ length: k })

  for (let i = 0; i < k; i++) {
    const remaining = lastIndex - i + 1
    const r = Math.floor(gen.next() * remaining)
    result[i] = array[H.get(r) ?? r]!
    // move the element at the end of the active range into slot r
    H.set(r, H.get(lastIndex - i) ?? lastIndex - i)
  }

  return result
}
