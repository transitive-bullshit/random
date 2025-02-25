import type { Seed, SeedOrRNG } from './types'
import { ARC4RNG } from './generators/arc4'
import { FunctionRNG } from './generators/function'
import { RNG } from './rng'

export function createRNG(seedOrRNG?: SeedOrRNG) {
  switch (typeof seedOrRNG) {
    case 'object':
      if (seedOrRNG instanceof RNG) {
        return seedOrRNG
      }
      break

    case 'function':
      return new FunctionRNG(seedOrRNG)

    default:
      return new ARC4RNG(seedOrRNG)
  }

  throw new Error(`invalid RNG seed or instance "${seedOrRNG}"`)
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
