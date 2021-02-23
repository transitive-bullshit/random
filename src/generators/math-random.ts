import RNG, { IArgs, Seed } from '../rng'

export default class RNGMathRandom extends RNG {
  get name () {
    return 'default'
  }

  next () {
    return Math.random()
  }

  seed (seed:Seed, opts:IArgs) {
    // intentionally empty
  }

  clone () {
    return new RNGMathRandom()
  }
}
