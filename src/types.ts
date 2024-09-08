import type { RNG } from './rng'

export type RNGFn = () => number
export type Seed = number | string
export type SeedOrRNG = number | string | RNGFn | RNG
