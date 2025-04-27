import type { RNG } from './rng'
import type { SeedOrRNG } from './types'
import { bates } from './distributions/bates'
import { bernoulli } from './distributions/bernoulli'
import { binomial } from './distributions/binomial'
import { exponential } from './distributions/exponential'
import { geometric } from './distributions/geometric'
import { irwinHall } from './distributions/irwin-hall'
import { logNormal } from './distributions/log-normal'
import { normal } from './distributions/normal'
import { pareto } from './distributions/pareto'
import { poisson } from './distributions/poisson'
import { uniform } from './distributions/uniform'
import { uniformBoolean } from './distributions/uniform-boolean'
import { uniformInt } from './distributions/uniform-int'
import { weibull } from './distributions/weibull'
import { MathRandomRNG } from './generators/math-random'
import { createRNG, shuffleInPlace, sparseFisherYates } from './utils'

/**
 * Distribution function
 */
type IDistFn<R> = (random: Random, ...argv: any) => R

/**
 * Distribution
 */
type IDist<R> = () => R

/**
 * Keyed cache entry
 */
interface ICacheEntry<T> {
  key: string
  distribution: () => T
}

/**
 * Seedable random number generator supporting many common distributions.
 *
 * @name Random
 * @class
 *
 * @param {RNG|function|string|number} [rng=Math.random] - Underlying random number generator or a seed for the default PRNG. Defaults to `Math.random`.
 */
export class Random {
  protected _rng!: RNG
  protected _cache: {
    [k: string]: ICacheEntry<any>
  } = {}

  constructor(seedOrRNG: SeedOrRNG = new MathRandomRNG()) {
    this._rng = createRNG(seedOrRNG)
  }

  /**
   * @member {RNG} rng - Underlying pseudo-random number generator.
   */
  get rng() {
    return this._rng
  }

  /**
   * Creates a new `Random` instance, optionally specifying parameters to
   * set a new seed.
   */
  clone(seedOrRNG: SeedOrRNG = this.rng.clone()): Random {
    return new Random(seedOrRNG)
  }

  /**
   * Sets the underlying pseudorandom number generator.
   *
   * @example
   * ```ts
   * import random from 'random'
   *
   * random.use('example-seed')
   * // or
   * random.use(Math.random)
   * ```
   */
  use(seedOrRNG: SeedOrRNG) {
    this._rng = createRNG(seedOrRNG)
    this._cache = {}
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
  next(): number {
    return this._rng.next()
  }

  /**
   * Samples a uniform random floating point number, optionally specifying
   * lower and upper bounds.
   *
   * Convenience wrapper around `random.uniform()`
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   */
  float(min?: number, max?: number): number {
    return this.uniform(min, max)()
  }

  /**
   * Samples a uniform random integer, optionally specifying lower and upper
   * bounds.
   *
   * Convenience wrapper around `random.uniformInt()`
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   */
  int(min?: number, max?: number): number {
    return this.uniformInt(min, max)()
  }

  /**
   * Samples a uniform random integer, optionally specifying lower and upper
   * bounds.
   *
   * Convenience wrapper around `random.uniformInt()`
   *
   * @alias `random.int`
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   */
  integer(min?: number, max?: number): number {
    return this.uniformInt(min, max)()
  }

  /**
   * Samples a uniform random boolean value.
   *
   * Convenience wrapper around `random.uniformBoolean()`
   *
   * @alias `random.boolean`
   */
  bool(): boolean {
    return this.uniformBoolean()()
  }

  /**
   * Samples a uniform random boolean value.
   *
   * Convenience wrapper around `random.uniformBoolean()`
   */
  boolean(): boolean {
    return this.uniformBoolean()()
  }

  /**
   * Returns an item chosen uniformly at random from the given array.
   *
   * Convenience wrapper around `random.uniformInt()`
   *
   * @param {Array<T>} [array] - Input array
   */
  choice<T>(array: Array<T>): T | undefined {
    if (!Array.isArray(array)) {
      throw new TypeError(
        `Random.choice expected input to be an array, got ${typeof array}`
      )
    }

    const length = array.length

    if (length > 0) {
      const index = this.uniformInt(0, length - 1)()
      return array[index]
    } else {
      return undefined
    }
  }

  /**
   * Returns a random subset of k items from the given array (without replacement).
   *
   * @param {Array<T>} [array] - Input array
   */
  sample<T>(array: Array<T>, k: number): Array<T> {
    if (!Array.isArray(array)) {
      throw new TypeError(
        `Random.sample expected input to be an array, got ${typeof array}`
      )
    }
    if (k < 0 || k > array.length) {
      throw new Error(
        `Random.sample: k must be between 0 and array.length (${array.length}), got ${k}`
      )
    }
    return sparseFisherYates(this.rng, array, k)
  }

  /**
   * Generates a thunk which returns samples of size k from the given array.
   *
   * This is for convenience only; there is no gain in efficiency.
   *
   * @param {Array<T>} [array] - Input array
   */
  sampler<T>(array: Array<T>, k: number): () => Array<T> {
    if (!Array.isArray(array)) {
      throw new TypeError(
        `Random.sampler expected input to be an array, got ${typeof array}`
      )
    }
    if (k < 0 || k > array.length) {
      throw new Error(
        `Random.sampler: k must be between 0 and array.length (${array.length}), got ${k}`
      )
    }

    const gen = this.rng

    return () => {
      return sparseFisherYates(gen, array, k)
    }
  }

  /**
   * Returns a shuffled copy of the given array.
   *
   * @param {Array<T>} [array] - Input array
   */
  shuffle<T>(array: Array<T>): Array<T> {
    if (!Array.isArray(array)) {
      throw new TypeError(
        `Random.shuffle expected input to be an array, got ${typeof array}`
      )
    }

    const copy = [...array]
    shuffleInPlace(this.rng, copy)

    return copy
  }

  /**
   * Generates a thunk which returns shuffled copies of the given array.
   *
   * @param {Array<T>} [array] - Input array
   */
  shuffler<T>(array: Array<T>): () => Array<T> {
    if (!Array.isArray(array)) {
      throw new TypeError(
        `Random.shuffler expected input to be an array, got ${typeof array}`
      )
    }

    const gen = this.rng
    const copy = [...array]

    return () => {
      shuffleInPlace(gen, copy)
      return [...copy]
    }
  }

  // --------------------------------------------------------------------------
  // Uniform distributions
  // --------------------------------------------------------------------------

  /**
   * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   */
  uniform(min?: number, max?: number): IDist<number> {
    return this._memoize<number>('uniform', uniform, min, max)
  }

  /**
   * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   */
  uniformInt(min?: number, max?: number): IDist<number> {
    return this._memoize<number>('uniformInt', uniformInt, min, max)
  }

  /**
   * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
   * with two possible outcomes, `true` or `false.
   *
   * This method is analogous to flipping a coin.
   */
  uniformBoolean(): IDist<boolean> {
    return this._memoize<boolean>('uniformBoolean', uniformBoolean)
  }

  // --------------------------------------------------------------------------
  // Normal distributions
  // --------------------------------------------------------------------------

  /**
   * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
   *
   * @param {number} [mu=0] - Mean
   * @param {number} [sigma=1] - Standard deviation
   */
  normal(mu?: number, sigma?: number): IDist<number> {
    return normal(this, mu, sigma)
  }

  /**
   * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
   *
   * @param {number} [mu=0] - Mean of underlying normal distribution
   * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
   */
  logNormal(mu?: number, sigma?: number): IDist<number> {
    return logNormal(this, mu, sigma)
  }

  // --------------------------------------------------------------------------
  // Bernoulli distributions
  // --------------------------------------------------------------------------

  /**
   * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   */
  bernoulli(p?: number): IDist<number> {
    return bernoulli(this, p)
  }

  /**
   * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
   *
   * @param {number} [n=1] - Number of trials.
   * @param {number} [p=0.5] - Success probability of each trial.
   */
  binomial(n?: number, p?: number): IDist<number> {
    return binomial(this, n, p)
  }

  /**
   * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   */
  geometric(p?: number): IDist<number> {
    return geometric(this, p)
  }

  // --------------------------------------------------------------------------
  // Poisson distributions
  // --------------------------------------------------------------------------

  /**
   * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
   *
   * @param {number} [lambda=1] - Mean (lambda > 0)
   */
  poisson(lambda?: number): IDist<number> {
    return poisson(this, lambda)
  }

  /**
   * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
   *
   * @param {number} [lambda=1] - Inverse mean (lambda > 0)
   */
  exponential(lambda?: number): IDist<number> {
    return exponential(this, lambda)
  }

  // --------------------------------------------------------------------------
  // Misc distributions
  // --------------------------------------------------------------------------

  /**
   * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
   *
   * @param {number} [n=1] - Number of uniform samples to sum (n >= 0)
   */
  irwinHall(n?: number): IDist<number> {
    return irwinHall(this, n)
  }

  /**
   * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
   *
   * @param {number} [n=1] - Number of uniform samples to average (n >= 1)
   */
  bates(n?: number): IDist<number> {
    return bates(this, n)
  }

  /**
   * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
   *
   * @param {number} [alpha=1] - Alpha
   */
  pareto(alpha?: number): IDist<number> {
    return pareto(this, alpha)
  }

  /**
   * Generates a [Weibull distribution](https://en.wikipedia.org/wiki/Weibull_distribution).
   *
   * @param {number} [lambda] - Lambda, the scale parameter
   * @param {number} [k] - k, the shape parameter
   */
  weibull(lambda: number, k: number) {
    return weibull(this, lambda, k)
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
   * @internal
   *
   * @param {string} label - Name of distribution
   * @param {function} getter - Function which generates a new distribution
   * @param {...*} args - Distribution-specific arguments
   */
  protected _memoize<T>(
    label: string,
    getter: IDistFn<any>,
    ...args: any[]
  ): IDist<T> {
    // return getter(this, ...args)
    const key = `${args.join(';')}`
    let value = this._cache[label]

    if (value === undefined || value.key !== key) {
      value = {
        key,
        distribution: getter(this, ...args)
      }
      this._cache[label] = value
    }

    return value.distribution
  }
}

export default new Random()
