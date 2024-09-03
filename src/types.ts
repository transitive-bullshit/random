import type { RNG } from './rng'

export type SeedFn = () => number
export type SeedType = number | string | SeedFn | RNG
