import ow from 'ow-shim'
import RNG from '../rng'

export default class RNGFunction extends RNG {
  constructor (seed, opts) {
    super()

    this.seed(seed, opts)
  }

  get name () {
    return 'function'
  }

  next () {
    return this._rng()
  }

  seed (seed) {
    ow(seed, ow.function)
    this._rng = seed
  }

  clone (seed, opts) {
    return new RNGFunction(seed, opts)
  }
}
