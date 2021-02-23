
export type SeedFn = (...args) => number
export type Seed = string | SeedFn
export type Opts = any[];

interface IRNG {
  next(): number
  seed(seed?: Seed, opts?: Opts): void
  clone(seed?: Seed, opts?: Opts): any
}

export default class RNG implements IRNG {
  get name(): string {
    throw new Error('RNG.name must be overridden')
  }

  next(): number {
    throw new Error('RNG.next must be overridden')
  }

  seed(seed?: Seed, opts?: Opts) {
    throw new Error('RNG.seed must be overridden')
  }

  clone(seed?: Seed, opts?: Opts):any {
    throw new Error('RNG.clone must be overridden')
  }

  _seed(seed: any, opts: Opts) {
    // TODO: add entropy and stuff

    if (seed === (seed || 0)) {
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

