import RNG from '../rng'

import seedrandom from 'seedrandom'

export default class RNGSeedRandom extends RNG {
  constructor (seed, opts) {
    super()

    this.seed(seed, opts)
  }

  get name () {
    return 'seedrandom'
  }

  next () {
    return this._rng()
  }

  seed (seed, opts) {
    if (typeof seed === 'function') {
      this._rng = seed
    } else {
      this._rng = seedrandom(this._seed(seed, opts))
    }
  }

  clone (seed, opts) {
    return new RNGSeedRandom(seed, opts)
  }
}
