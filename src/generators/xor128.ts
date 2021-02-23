import RNG from '../rng'

export default class RNGXOR128 extends RNG {

  x: number;
  y: number;
  z: number;
  w: number;

  constructor(seed: any, opts: any) {
    super()

    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 0

    this.seed(seed, opts)
  }

  get name() {
    return 'xor128'
  }

  next() {
    const t = this.x ^ (this.x << 1)
    this.x = this.y
    this.y = this.z
    this.z = this.w
    this.w = this.w ^ ((this.w >>> 19) ^ t ^ (t >>> 8))
    return (this.w >>> 0) / 0x100000000
  }

  seed(seed: any, opts: any) {
    // this._rng = seedrandom(this._seed(seed, opts))

    this.x = this._seed(seed, opts)

    // discard an initial batch of 64 values
    for (let i = 0; i < 64; ++i) {
      this.next()
    }
  }

  clone(seed: any, opts: any) {
    return new RNGXOR128(seed, opts)
  }
}
