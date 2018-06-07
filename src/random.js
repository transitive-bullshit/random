import LRUCache from 'lru-cache'
import ow from 'ow'

import RNG from './rng'
import RNGFactory from './rng-factory'

import uniform from './distributions/uniform'
import uniformInt from './distributions/uniform-int'
import uniformBoolean from './distributions/uniform-boolean'

import normal from './distributions/normal'
import logNormal from './distributions/log-normal'

import bernoulli from './distributions/bernoulli'
import binomial from './distributions/binomial'
import geometric from './distributions/geometric'

import poisson from './distributions/poisson'
import exponential from './distributions/exponential'

import irwinHall from './distributions/irwin-hall'
import bates from './distributions/bates'
import pareto from './distributions/pareto'

/**
 * Seedable random number generator supporting many common distributions.
 *
 * Defaults to Math.random as its underlying pseudorandom number generator.
 *
 * @name Random
 * @class
 *
 * @param {RNG|function} [rng=Math.random] - Underlying pseudorandom number generator.
 */
class Random {
  constructor (rng) {
    if (rng) ow(rng, ow.object.label('rng').instanceOf(RNG))

    this.use(rng)
  }

  /**
   * @member {RNG} Underlying pseudo-random number generator
   */
  get rng () {
    return this._rng
  }

  /**
   * Creates a new `Random` instance, optionally specifying parameters to
   * set a new seed.
   *
   * @see RNG.clone
   *
   * @param {string} [seed] - Optional seed for new RNG.
   * @param {object} [opts] - Optional config for new RNG options.
   * @return {Random}
   */
  clone (...args) {
    return new Random(this.rng.clone(...args))
  }

  /**
   * Sets the underlying pseudorandom number generator used via
   * either an instance of `seedrandom`, a custom instance of RNG
   * (for PRNG plugins), or a string specifying the PRNG to use
   * along with an optional `seed` and `opts` to initialize the
   * RNG.
   *
   * @example
   * ```js
   * const random = require('random')
   *
   * random.use('xor128', 'foobar')
   * // or
   * random.use(seedrandom('kittens'))
   * // or
   * random.use(Math.random)
   * ```
   *
   * @param {...*} args
   */
  use (...args) {
    this._rng = RNGFactory(...args)

    // clear distribution cache when replacing underlying rng
    this._cache = LRUCache({ max: 64 })
  }

  /**
   * Patches `Math.random` with this Random instance's PRNG.
   */
  patch () {
    if (this._patch) {
      throw new Error('Math.random already patched')
    }

    this._patch = Math.random
    Math.random = this.uniform()
  }

  /**
   * Restores a previously patched `Math.random` to its original value.
   */
  unpatch () {
    if (this._patch) {
      Math.random = this._patch
      delete this._patch
    }
  }

  // --------------------------------------------------------------------------
  // Uniform utility functions
  // --------------------------------------------------------------------------

  /**
   * Convenience wrapper around `this.rng.next()`
   *
   * Returns a floating point number in [0, 1).
   *
   * @return {number}
   */
  next () {
    return this._rng.next()
  }

  /**
   * Samples a uniform random floating point number, optionally specifying
   * lower and upper bounds.
   *
   * Convence wrapper around `random.uniform()`
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   * @return {number}
   */
  float (min, max) {
    return this.uniform(min, max)()
  }

  /**
   * Samples a uniform random integer, optionally specifying lower and upper
   * bounds.
   *
   * Convence wrapper around `random.uniformInt()`
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   * @return {number}
   */
  int (min, max) {
    return this.uniformInt(min, max)()
  }

  /**
   * Samples a uniform random integer, optionally specifying lower and upper
   * bounds.
   *
   * Convence wrapper around `random.uniformInt()`
   *
   * @alias `random.int`
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   * @return {number}
   */
  integer (min, max) {
    return this.uniformInt(min, max)()
  }

  /**
   * Samples a uniform random boolean value.
   *
   * Convence wrapper around `random.uniformBoolean()`
   *
   * @alias `random.boolean`
   *
   * @return {boolean}
   */
  bool () {
    return this.uniformBoolean()()
  }

  /**
   * Samples a uniform random boolean value.
   *
   * Convence wrapper around `random.uniformBoolean()`
   *
   * @return {boolean}
   */
  boolean () {
    return this.uniformBoolean()()
  }

  // --------------------------------------------------------------------------
  // Uniform distributions
  // --------------------------------------------------------------------------

  /**
   * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   * @return {function}
   */
  uniform (...args) {
    return this._memoize('uniform', uniform, ...args)
  }

  /**
   * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   * @return {function}
   */
  uniformInt (...args) {
    return this._memoize('uniformInt', uniformInt, ...args)
  }

  /**
   * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
   * with two possible outcomes, `true` or `false.
   *
   * This method is analogous to flipping a coin.
   *
   * @return {function}
   */
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
