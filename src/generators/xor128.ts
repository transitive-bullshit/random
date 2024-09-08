import type { Seed } from '../types'
import { RNG } from '../rng'
import { processSeed } from '../utils'

export class XOR128RNG extends RNG {
  protected _seed: number

  x: number
  y: number
  z: number
  w: number

  constructor(seed?: Seed) {
    super()

    this._seed = processSeed(seed)
    this.x = this._seed
    this.y = 0
    this.z = 0
    this.w = 0

    // discard an initial batch of 64 values
    for (let i = 0; i < 64; ++i) {
      this.next()
    }
  }

  override get name() {
    return 'xor128'
  }

  override next() {
    const t = this.x ^ (this.x << 1)
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
