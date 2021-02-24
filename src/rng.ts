export interface IRNG {
  next(): number
  seed<S,O>(seed?: S, opts?: O): void
  clone<S,O>(seed?: S, opts?: O): any
  _seed?<S,O>(seed: S, opts: O): any
}

export default class RNG implements IRNG {
  get name(): string {
    throw new Error('RNG.name must be overridden')
  }

  next(): number {
    throw new Error('RNG.next must be overridden')
  }

  seed(_seed?:unknown, _opts?:unknown) {
    throw new Error('RNG.seed must be overridden')
  }

  clone(_seed?:unknown, _opts?:unknown): any {
    throw new Error('RNG.clone must be overridden')
  }

  _seed(seed:any, _opts?:unknown) {
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
