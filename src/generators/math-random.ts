import RNG from '../rng'

export default class RNGMathRandom extends RNG {
  get name () {
    return 'default'
  }

  next () {
    return Math.random()
  }

  seed (seed: any, opts: any) {
    // intentionally empty
  }

  clone () {
    return new RNGMathRandom()
  }
}
