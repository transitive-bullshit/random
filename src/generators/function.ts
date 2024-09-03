import type { SeedFn } from '../types'
import { RNG } from '../rng'

export class RNGFunction extends RNG {
  _name!: string
  _seedFn!: SeedFn

  constructor(seedFn: SeedFn, opts?: Record<string, unknown>) {
    super()

    this.seed(seedFn, opts)
  }

  get name() {
    return this._name
  }

  next() {
    return this._seedFn()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  seed(seedFn: SeedFn, _opts?: Record<string, unknown>) {
    this._name = seedFn.name ?? 'function'
    this._seedFn = seedFn
  }

  clone(_: undefined, opts: Record<string, unknown>) {
    return new RNGFunction(this._seedFn, opts)
  }
}
