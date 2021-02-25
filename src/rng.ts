interface IRNG {
  next(): number
  seed<S, O>(seed?: S, opts?: O): void
  clone<S, O>(seed?: S, opts?: O): RNG
  _seed?<O>(seed: number, opts: O): number
}

export default abstract class RNG implements IRNG {

  abstract get name(): string

  abstract next(): number

  abstract seed(_seed?: unknown, _opts?: unknown): void

  abstract clone(_seed?: unknown, _opts?: unknown): RNG

  _seed(seed: number, _opts?: unknown) {
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

