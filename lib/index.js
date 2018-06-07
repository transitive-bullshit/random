import LRUCache from 'lru-cache'
import ow from 'ow'

import RNG from './rng'
import RNGFactory from './rng-factory'

import uniform from './distributions/uniform'
import uniformInt from './distributions/uniform-int'
import uniformBoolean from './distributions/uniform-boolean'

import normal from './distributions/normal'
import logNormal from './distributions/log-normal'
// import chiSquared from './distributions/chi-squared'

import bernoulli from './distributions/bernoulli'
import binomial from './distributions/binomial'
import geometric from './distributions/geometric'

import poisson from './distributions/poisson'
import exponential from './distributions/exponential'
// import gamma from './distributions/gamma'

import irwinHall from './distributions/irwin-hall'
import bates from './distributions/bates'
import pareto from './distributions/pareto'

export class Random {
  constructor (rng) {
    if (rng) ow(rng, ow.object.label('rng').instanceOf(RNG))

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
    this._cache = LRUCache({ max: 64 })
  }

  patch () {
    if (this._patch) {
      throw new Error('Math.random already patched')
    }

    this._patch = Math.random
    Math.random = this.uniform()
  }

  unpatch () {
    if (this._patch) {
      Math.random = this._patch
      delete this._patch
    }
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

  /**
   * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
   *
   * @param {number} [mu=0] - Mean
   * @param {number} [sigma=1] - Standard deviation
   * @return {function}
   */
  normal (...args) {
    return this._memoize('normal', normal, ...args)
  }

  /**
   * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
   *
   * @param {number} [mu=0] - Mean of underlying normal distribution
   * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
   * @return {function}
   */
  logNormal (...args) {
    return this._memoize('logNormal', logNormal, ...args)
  }

  /**
   * Generates a [Chi-squared distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution).
   *
   * @param {number} [k=1] - Degrees of freedom (k > 0)
   * @return {function}
   */
  // chiSquared (...args) {
  //   return this._memoize('chiSquared', chiSquared, ...args)
  // }

  // --------------------------------------------------------------------------
  // Bernoulli distributions
  // --------------------------------------------------------------------------

  /**
   * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   * @return {function}
   */
  bernoulli (...args) {
    return this._memoize('bernoulli', bernoulli, ...args)
  }

  /**
   * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
   *
   * @param {number} [n=1] - Number of trials.
   * @param {number} [p=0.5] - Success probability of each trial.
   * @return {function}
   */
  binomial (...args) {
    return this._memoize('binomial', binomial, ...args)
  }

  /**
   * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   * @return {function}
   */
  geometric (...args) {
    return this._memoize('geometric', geometric, ...args)
  }

  // --------------------------------------------------------------------------
  // Poisson distributions
  // --------------------------------------------------------------------------

  /**
   * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
   *
   * @param {number} [lambda=1] - Mean (lambda > 0)
   * @return {function}
   */
  poisson (...args) {
    return this._memoize('poisson', poisson, ...args)
  }

  /**
   * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
   *
   * @param {number} [lambda=1] - Inverse mean (lambda > 0)
   * @return {function}
   */
  exponential (...args) {
    return this._memoize('exponential', exponential, ...args)
  }

  /**
   * Generates a [Gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution).
   *
   * @param {number} [alpha=1] - Shape (alpha > 0)
   * @param {number} [beta=1] - Rate (beta > 0)
   * @return {function}
   */
  // gamma (...args) {
  //   return this._memoize('gamma', gamma, ...args)
  // }

  // --------------------------------------------------------------------------
  // Misc distributions
  // --------------------------------------------------------------------------

  /**
   * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
   *
   * @param {number} n - Number of uniform samples to sum (n >= 0)
   * @return {function}
   */
  irwinHall (...args) {
    return this._memoize('irwinHall', irwinHall, ...args)
  }

  /**
   * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
   *
   * @param {number} n - Number of uniform samples to average (n >= 1)
   * @return {function}
   */
  bates (...args) {
    return this._memoize('bates', bates, ...args)
  }

  /**
   * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
   *
   * @param {number} alpha - Alpha
   * @return {function}
   */
  pareto (...args) {
    return this._memoize('pareto', pareto, ...args)
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
    let distribution = this._cache.get(key)

    if (distribution === undefined) {
      distribution = getter(this, ...args)
      this._cache.set(key, distribution)
    }

    return distribution
  }
}

// defaults to Math.random as its RNG
export default new Random()
