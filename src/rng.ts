// TODO: Narrow these down
export type Seed = any;

export interface ISeedRandom {
  seed?: string | undefined;
  options?: seedrandom.seedRandomOptions | undefined
  callback?: seedrandom.seedrandomCallback | undefined
}

export type IArgs = ISeedRandom & {
  arg0: string;
}

interface IRNG {
  name(): any;
  next(): any
  seed(seed: Seed, opts: IArgs): any
  clone(seed: Seed, opts: IArgs): any
}

export default class RNG implements IRNG {

  _rng: Function

  get name(): any {
    throw new Error('RNG.name must be overridden')
  }

  next(): any {
    throw new Error('RNG.next must be overridden')
  }

  seed(seed?: Seed, opts?: IArgs): any {
    throw new Error('RNG.seed must be overridden')
  }

  clone(seed?: Seed, opts?: IArgs): any {
    throw new Error('RNG.clone must be overridden')
  }

  _seed(seed: Seed, opts?: IArgs): any {
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
