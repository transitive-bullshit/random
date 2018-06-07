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

    // clear distribution cache when replacing underlying rng
    this._memoize = LRUCache({ max: 64 })
  }

  // --------------------------------------------------------------------------
  // Uniform utility functions
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
  // Uniform distributions
  // --------------------------------------------------------------------------

  uniform (...args) {
    return this._memoize('uniform', uniform, ...args)
  }

  uniformInt (...args) {
    return this._memoize('uniformInt', uniformInt, ...args)
  }

  uniformBoolean () {
    return this._memoize('uniformBoolean', uniformBoolean)
  }

  // --------------------------------------------------------------------------
  // Normal distributions
  // --------------------------------------------------------------------------

  normal (...args) {
    return this._memoize('normal', normal, ...args)
  }

  logNormal (...args) {
    return this._memoize('logNormal', logNormal, ...args)
  }

  // --------------------------------------------------------------------------
  // Bernoulli distributions
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // Poisson distributions
  // --------------------------------------------------------------------------

  poisson (...args) {
    return this._memoize('poisson', poisson, ...args)
  }

  exponential (...args) {
    return this._memoize('exponential', exponential, ...args)
  }

  // --------------------------------------------------------------------------
  // Misc distributions
  // --------------------------------------------------------------------------

  irwinHall (...args) {
    return this._memoize('irwinHall', irwinHall, ...args)
  }

  bates (...args) {
    return this._memoize('bates', bates, ...args)
  }

  // --------------------------------------------------------------------------
  // Internal
  // --------------------------------------------------------------------------

  /**
   * Memoizes distributions to ensure they're only created when necessary.
   *
   * Returns a thunk which that returns independent, identically distributed
   * samples from the specified distribution.
   *
   * @private
   *
   * @param {string} label - Name of distribution
   * @param {function} getter - Function which generates a new distribution
   * @param {...*} args - Distribution-specific arguments
   *
   * @return {function}
   */
  _memoize (label, getter, ...args) {
    const key = `${label};${args.join(';')}`
    let distribution = this._memoize.get(key)

    if (distribution === undefined) {
      distribution = getter(this, ...args)
      this._memoize.set(key, distribution)
    }

    return distribution
  }
}

// defaults to Math.random as its RNG
export default new Random()
