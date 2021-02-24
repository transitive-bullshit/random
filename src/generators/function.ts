import ow from 'ow'
import RNG from '../rng'

export type SeedFn = <T>(...args:T[]) => number

export default class RNGFunction<T> extends RNG {

  _rng: SeedFn

  constructor(thunk: SeedFn, opts?: T[]) {
    super()

    this.seed(thunk, opts)
  }

  get name() {
    return 'function'
  }

  next() {
    return this._rng()
  }

  seed(thunk: SeedFn, _opts?: T[]) {
    ow(thunk, ow.function)
    this._rng = thunk
  }

  clone(opts: T[]) {
    return new RNGFunction(this._rng, opts)
  }
}
