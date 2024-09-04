import type { SeedOrRNG } from './types'
import { ARC4RNG } from './generators/arc4'
import { FunctionRNG } from './generators/function'
import { RNG } from './rng'

export const RNGFactory = (seedOrRNG?: SeedOrRNG) => {
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
