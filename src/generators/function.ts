import ow from 'ow-lite'
import RNG, { IArgs } from '../rng'

export default class RNGFunction extends RNG {

  thunk:Function
  opts:IArgs
  constructor (thunk:Function,opts?:IArgs) {
    super()
    this.seed(thunk)
  }

  get name () {
    return 'function'
  }

  next () {
    return this._rng()
  }

  seed (thunk:Function) {
    ow(thunk, ow.function)
    this._rng = thunk
  }

  clone (...opts:[IArgs]) {
    return new RNGFunction(this._rng, ...opts)
  }
}
