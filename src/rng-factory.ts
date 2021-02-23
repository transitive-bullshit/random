import seedrandom from 'seedrandom'

import RNG, { IArgs } from './rng'
import RNGFunction from './generators/function'


export default (...args: [IArgs]) => {
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
