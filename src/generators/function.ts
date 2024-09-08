import type { RNGFn } from '../types'
import { RNG } from '../rng'

export class FunctionRNG extends RNG {
  _name: string
  _rngFn: RNGFn

  constructor(rngFn: RNGFn) {
    super()

    this._name = rngFn.name ?? 'function'
    this._rngFn = rngFn
  }

  override get name() {
    return this._name
  }

  override next() {
    return this._rngFn()
  }

  override clone() {
    return new FunctionRNG(this._rngFn)
  }
}
