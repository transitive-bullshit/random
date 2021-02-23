import ow from 'ow'
import RNG, { Opts, SeedFn } from '../rng'

export type RNGFunctionType = seedrandom.prng | RNG | any

export default class RNGFunction<T extends SeedFn> extends RNG {

  _rng: T

  constructor(thunk: T, opts?: Opts) {
    super()

    this.seed(thunk, opts)
  }

  get name() {
    return 'function'
  }

  next() {
    return this._rng()
  }

  seed(thunk: T, opts?: Opts) {
    ow(thunk, ow.function)
    this._rng = thunk
  }

  clone(...opts: Opts) {
    return new RNGFunction(this._rng, ...opts)
  }
}
