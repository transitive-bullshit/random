import LRUCache from 'lru-cache'
import ow from 'ow'

import RNG from './rng'
import RNGFactory from './rng-factory'

import uniform from './distributions/uniform'
import uniformInt from './distributions/uniform-int'
import uniformBoolean from './distributions/uniform-boolean'
import normal from './distributions/normal'
import logNormal from './distributions/log-normal'
import poisson from './distributions/poisson'
import exponential from './distributions/exponential'
import irwinHall from './distributions/irwin-hall'
import bates from './distributions/bates'

export class Random {
  constructor (rng) {
    ow(rng, ow.object.label('rng').instanceOf(RNG))

    this._cache = LRUCache({ max: 64 })
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

  float (min, max) {
    return this.uniform(min, max)()
  }

  int (min, max) {
    return this.uniformInt(min, max)()
  }

  integer (min, max) {
    return this.uniformInt(min, max)()
  }

  bool () {
    return this.uniformBoolean()()
  }

  boolean () {
    return this.uniformBoolean()()
  }

  // --------------------------------------------------------------------------
  // UNIFORM DISTRIBUTIONS
  // --------------------------------------------------------------------------

  uniform (...args) {
    return this._cache('uniform', () => {
      return uniform(this, ...args)
    }, ...args)
  }

  uniformInt (...args) {
    return this._cache('uniformInt', () => {
      return uniformInt(this, ...args)
    }, ...args)
  }

  uniformBoolean () {
    return this._cache('uniformBoolean', () => {
      return uniformBoolean(this)
    })
  }

  // --------------------------------------------------------------------------
  // NORMAL DISTRIBUTIONS
  // --------------------------------------------------------------------------

  normal (...args) {
    return this._cache('normal', () => {
      return normal(this, ...args)
    }, ...args)
  }

  logNormal (...args) {
    return this._cache('logNormal', () => {
      return logNormal(this, ...args)
    }, ...args)
  }

  // --------------------------------------------------------------------------
  // BERNOULLI DISTRIBUTIONS
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // POISSON DISTRIBUTIONS
  // --------------------------------------------------------------------------

  poisson (...args) {
    return this._cache('poisson', () => {
      return poisson(this, ...args)
    }, ...args)
  }

  exponential (...args) {
    return this._cache('exponential', () => {
      return exponential(this, ...args)
    }, ...args)
  }

  // --------------------------------------------------------------------------
  // MISC DISTRIBUTIONS
  // --------------------------------------------------------------------------

  irwinHall (...args) {
    return this._cache('irwinHall', () => {
      return irwinHall(this, ...args)
    }, ...args)
  }

  bates (...args) {
    return this._cache('bates', () => {
      return bates(this, ...args)
    }, ...args)
  }

  // --------------------------------------------------------------------------
  // INTERNAL
  // --------------------------------------------------------------------------

  _cache (label, getter, ...args) {
    const key = `${label};${args.join(';')}`
    let distribution = this._cache.get(key)

    if (distribution === undefined) {
      distribution = getter()
      this._cache.set(key, distribution)
    }

    return distribution
  }
}

// defaults to Math.random as its RNG
export default new Random()
