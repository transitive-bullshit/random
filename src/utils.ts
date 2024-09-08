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

export function processSeed(seed?: Seed): number {
  if (seed === undefined) {
    seed = crypto.randomUUID()
  }

  if (typeof seed === 'number') {
    return seed
  }

  const strSeed = `${seed}`
  let s = 0

  for (let k = 0; k < strSeed.length; ++k) {
    s ^= strSeed.charCodeAt(k) | 0
  }

  return s
}

export function mixKey(seed: number, key: number[]): number[] {
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
