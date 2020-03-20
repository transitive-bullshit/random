import seedrandom from 'seedrandom'

import RNG from './rng'

import RNGFunction from './generators/function'

export default (...args) => {
  const [arg0 = 'default', ...rest] = args

  switch (typeof arg0) {
    case 'object':
      if (arg0 instanceof RNG) {
        return arg0
      }
      break

    case 'function':
      return new RNGFunction(arg0)

    case 'string':
    case 'number':
      return new RNGFunction(seedrandom(...rest))
  }

  throw new Error(`invalid RNG "${arg0}"`)
}
