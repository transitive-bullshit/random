import ow from 'ow'

import RNG from './rng'
import RNGFactory from './rng-factory'

import uniform from './distributions/uniform'
import uniformInt from './distributions/uniform-int'
import uniformBoolean from './distributions/uniform-boolean'
import normal from './distributions/normal'
import logNormal from './distributions/log-normal'
import exponential from './distributions/exponential'
import irwinHall from './distributions/irwin-hall'
import bates from './distributions/bates'

export class Random {
  constructor (rng) {
    ow(rng, ow.object.label('rng').instanceOf(RNG))

    this.use(rng)
  }

  get rng () {
    return this._rng
  }

  clone (...args) {
    return new Random(this.rng.clone(...args))
  }

  use (...args) {
    this._rng = RNGFactory(...args)
  }

  // --------------------------------------------------------------------------
  // UNIFORM DISTRIBUTIONS
  // --------------------------------------------------------------------------

  next () {
    return this._rng.next()
  }

  uniform (...args) {
    return uniform(this, ...args)
  }

  float (...args) {
    return uniform(this, ...args)
  }

  int (...args) {
    return uniformInt(this, ...args)
  }

  integer (...args) {
    return uniformInt(this, ...args)
  }

  bool (...args) {
    return uniformBoolean(this, ...args)
  }

  boolean (...args) {
    return uniformBoolean(this, ...args)
  }

  // --------------------------------------------------------------------------
  // NORMAL DISTRIBUTIONS
  // --------------------------------------------------------------------------

  normal (...args) {
    return normal(this, ...args)
  }

  logNormal (...args) {
    return logNormal(this, ...args)
  }

  // --------------------------------------------------------------------------
  // BERNOULLI DISTRIBUTIONS
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // POISSON DISTRIBUTIONS
  // --------------------------------------------------------------------------

  exponential (...args) {
    return exponential(this, ...args)
  }

  // --------------------------------------------------------------------------
  // MISC DISTRIBUTIONS
  // --------------------------------------------------------------------------

  irwinHall (...args) {
    return irwinHall(this, ...args)
  }

  bates (...args) {
    return bates(this, ...args)
  }
}

// defaults to Math.random as its RNG
export default new Random()
