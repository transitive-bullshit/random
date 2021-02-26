export type SeedFn = () => number
export type SeedType = number | string | SeedFn | RNG

export default abstract class RNG {
  abstract get name(): string

  abstract next(): number

  abstract seed(_seed?: SeedType, _opts?: {}): void

  abstract clone(_seed?: SeedType, _opts?: {}): RNG

  _seed (seed: number, _opts?: unknown) {
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
