import ow from 'ow-lite'
import RNG from '../rng'

export default class RNGFunction extends RNG {

  _rng: any

  constructor(thunk: Function, opts?: any[]) {
    super()

    this.seed(thunk, opts)
  }

  get name() {
    return 'function'
  }

  next() {
    return this._rng()
  }

  seed(thunk: Function, opts?: any[]) {
    ow(thunk, ow.function)
    this._rng = thunk
  }

  clone(...opts: any[]) {
    return new RNGFunction(this._rng, ...opts)
  }
}
