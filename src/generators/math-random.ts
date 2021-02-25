import RNG from '../rng'

export default class RNGMathRandom extends RNG {
  get name () {
    return 'default'
  }

  next () {
    return Math.random()
  }

  seed (_seed: unknown, _opts: unknown) {
    // intentionally empty
  }

  clone () {
    return new RNGMathRandom()
  }
}
