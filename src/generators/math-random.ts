import RNG from '../rng'

export default class RNGMathRandom<T> extends RNG {
  get name() {
    return 'default'
  }

  next() {
    return Math.random()
  }

  seed(_seed: unknown, _opts: T[]) {
    // intentionally empty
  }

  clone() {
    return new RNGMathRandom()
  }
}
