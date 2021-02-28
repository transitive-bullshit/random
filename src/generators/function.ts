import RNG, { SeedFn } from '../rng'

export default class RNGFunction extends RNG {
  _rng: SeedFn

  constructor(thunk: SeedFn, opts?: Record<string, unknown>) {
    super()

    this.seed(thunk, opts)
  }

  get name() {
    return 'function'
  }

  next() {
    return this._rng()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  seed(thunk: SeedFn, _opts?: Record<string, unknown>) {
    this._rng = thunk
  }

  clone(_: undefined, opts: Record<string, unknown>) {
    return new RNGFunction(this._rng, opts)
  }
}
