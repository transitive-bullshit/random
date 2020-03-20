export default class RNG {
  get name () {
    throw new Error('RNG.name must be overridden')
  }

  next () {
    throw new Error('RNG.next must be overridden')
  }

  seed (seed, opts) {
    throw new Error('RNG.seed must be overridden')
  }

  clone (seed, opts) {
    throw new Error('RNG.clone must be overridden')
  }

  _seed (seed, opts) {
    // TODO: add entropy and stuff

    if (seed === (seed | 0)) {
      return seed
    } else {
      const strSeed = '' + seed
      let s = 0

      for (let k = 0; k < strSeed.length; ++k) {
        s ^= strSeed.charCodeAt(k) | 0
      }

      return s
    }
  }
}
