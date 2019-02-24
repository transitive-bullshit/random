import ow from 'ow-lite'
import RNG from '../rng'

export default class RNGFunction extends RNG {
  constructor (thunk, opts) {
    super()

    this.seed(thunk, opts)
  }

  get name () {
    return 'function'
  }

  next () {
    return this._rng()
  }

  seed (thunk) {
    ow(thunk, ow.function)
    this._rng = thunk
  }

  clone (...opts) {
    return new RNGFunction(this._rng, ...opts)
  }
}
