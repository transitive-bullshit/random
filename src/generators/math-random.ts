import { RNG } from '../rng'

export class RNGMathRandom extends RNG {
  get name() {
    return 'default'
  }

  next() {
    return Math.random()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  seed(_seed: unknown, _opts: Record<string, unknown>) {
    // intentionally empty
  }

  clone() {
    return new RNGMathRandom()
  }
}
