import seedrandom from 'seedrandom'

import RNG from './rng.js'
import RNGFunction from './generators/function.js'

/**
 * Construct an RNG with variable inputs. Used in calls to Random constructor
 * @param {...*} args - Distribution-specific arguments
 * @return RNG
 *
 * @example
 * new Random(RNGFactory(...args))
 */
export default <T extends any[]>(...args: T) => {
  const [arg0 = 'default'] = args

  switch (typeof arg0) {
    case 'object':
      if (arg0 instanceof RNG) {
        return arg0
      }
      break

    case 'function':
      return new RNGFunction(arg0)

    case 'number':
    case 'string':
      return new RNGFunction(seedrandom(...args))
  }

  throw new Error(`invalid RNG "${arg0}"`)
}
