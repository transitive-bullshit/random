import type { Seed } from '../types'
import { RNG } from '../rng'

export class XOR128RNG extends RNG {
  protected readonly _seed: Seed

  x: number
  y: number
  z: number
  w: number

  constructor(seed: Seed = crypto.randomUUID()) {
    super()

    this._seed = seed
    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 0

    let strSeed: string = ''

    if (typeof seed === 'number') {
      this.x = seed
    } else {
      strSeed += `${seed}`
    }

    // Mix in string seed, then discard an initial batch of 64 values.
    for (let i = 0; i < strSeed.length + 64; ++i) {
      this.x ^= strSeed.charCodeAt(i) | 0
      this.next()
    }
  }

  override get name() {
    return 'xor128'
  }

  override next() {
    const t = this.x ^ (this.x << 11)
    this.x = this.y
    this.y = this.z
    this.z = this.w
    this.w = this.w ^ ((this.w >>> 19) ^ t ^ (t >>> 8))
    return (this.w >>> 0) / 0x1_00_00_00_00
  }

  override clone() {
    return new XOR128RNG(this._seed)
  }
}
