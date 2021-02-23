import ow from 'ow-lite'
import RNG from '../rng'

export type Fn = (...args) => number

export default class RNGFunction extends RNG {

  _rng: Fn

  constructor(thunk: Fn, opts?: any[]) {
    super()

    this.seed(thunk, opts)
  }

  get name() {
    return 'function'
  }

  next() {
    return this._rng()
  }

  seed(thunk: Fn, opts?: any[]) {
    ow(thunk, ow.function)
    this._rng = thunk
  }

  clone(...opts: any[]) {
    return new RNGFunction(this._rng, ...opts)
  }
}
