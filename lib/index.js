import ow from 'ow'

import RNG from './rng'
import RNGFactory from './rng-factory'

import uniform from './distributions/uniform'
import normal from './distributions/normal'

export class Random {
  constructor (rng) {
    ow(rng, ow.object.label('rng').instanceOf(RNG))

    this.use(rng)
  }

  get rng () {
    return this._rng
  }

  uniform (...args) {
    return uniform(this._next, ...args)
  }

  float (...args) {
    return uniform(this._next, ...args)
  }

  normal (...args) {
    return normal(this._next, ...args)
  }

  clone (...args) {
    return new Random(this.rng.clone(...args))
  }

  use (...args) {
    this._rng = RNGFactory(...args)
    this._next = this._rng.next.bind(this._rng)
  }
}

export default new Random()
