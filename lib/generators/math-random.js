import RNG from '../rng'

export default class RNGMathRandom extends RNG {
  get name () {
    return 'default'
  }

  get min () {
    return 0.0
  }

  get max () {
    return 1.0
  }

  next () {
    return Math.random()
  }

  seed (seed, opts) {
    // intentionally empty
  }

  clone () {
    return new RNGMathRandom()
  }
}
