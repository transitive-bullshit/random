import RNG from './rng'

import RNGXOR128 from './generators/xor128'
import RNGSeedRandom from './generators/seedrandom'

const PRNG_BUILTINS = {
  'xor128': RNGXOR128,
  'seedrandom': RNGSeedRandom
}

export default (...args) => {
  const [ arg0, ...rest ] = args

  switch (typeof arg0) {
    case 'object':
      if (arg0 instanceof RNG) {
        return arg0
      }
      break

    case 'function':
      break

    case 'string':
      const PRNG = PRNG_BUILTINS[arg0]
      if (PRNG) {
        return new PRNG(...rest)
      }
      break
  }

  throw new Error(`invalid RNG "${arg0}"`)
}
