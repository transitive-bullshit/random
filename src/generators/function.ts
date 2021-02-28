import ow from 'ow'
import RNG, { SeedFn } from '../rng'

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

  clone(_: undefined, opts: T[]) {
    return new RNGFunction(this._rng, opts)
  }
}
