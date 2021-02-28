export type SeedFn = () => number
export type SeedType = number | string | SeedFn | RNG

export default abstract class RNG {
  abstract get name(): string

  abstract next(): number

  abstract seed(_seed?: SeedType, _opts?: Record<string, unknown>): void

  abstract clone(_seed?: SeedType, _opts?: Record<string, unknown>): RNG

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _seed(seed: number, _opts?: Record<string, unknown>) {
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
