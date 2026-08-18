import type { Seed } from '../types'
import { RNG } from '../rng'

const UINT53_SIZE = 0x20_00_00_00_00_00_00
const UINT26_SIZE = 0x04_00_00_00

function rotateLeft(value: number, shift: number): number {
  return (value << shift) | (value >>> (32 - shift))
}

/**
 * cyrb128, a compact non-cryptographic string hash for seed generation.
 *
 * @see https://stackoverflow.com/a/47593316
 */
function cyrb128(seed: Seed): [number, number, number, number] {
  const value = `${seed}`
  let s0 = 0x6a_09_e6_67
  let s1 = 0xbb_67_ae_85
  let s2 = 0x3c_6e_f3_72
  let s3 = 0xa5_4f_f5_3a

  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i)
    s0 = s1 ^ Math.imul(s0 ^ code, 0x23_9b_96_1b)
    s1 = s2 ^ Math.imul(s1 ^ code, 0xab_0e_97_89)
    s2 = s3 ^ Math.imul(s2 ^ code, 0x38_b3_4a_e5)
    s3 = s0 ^ Math.imul(s3 ^ code, 0xa1_e3_8b_93)
  }

  s0 = Math.imul(s2 ^ (s0 >>> 18), 0x23_9b_96_1b)
  s1 = Math.imul(s3 ^ (s1 >>> 22), 0xab_0e_97_89)
  s2 = Math.imul(s0 ^ (s2 >>> 17), 0x38_b3_4a_e5)
  s3 = Math.imul(s1 ^ (s3 >>> 19), 0xa1_e3_8b_93)

  s0 ^= s1 ^ s2 ^ s3
  s1 ^= s0
  s2 ^= s0
  s3 ^= s0

  return [s0 >>> 0, s1 >>> 0, s2 >>> 0, s3 >>> 0]
}

/**
 * xoshiro128** is a small, fast, general-purpose pseudorandom number generator
 * with 128 bits of state and a period of 2^128 - 1.
 *
 * It is not cryptographically secure.
 *
 * @see https://prng.di.unimi.it/xoshiro128starstar.c
 */
export class Xoshiro128StarStarRNG extends RNG {
  protected readonly _seed: Seed

  protected s0 = 0
  protected s1 = 0
  protected s2 = 0
  protected s3 = 0

  constructor(seed: Seed = crypto.randomUUID()) {
    super()

    this._seed = seed
    this.setState(cyrb128(seed))
  }

  protected setState(state: [number, number, number, number]): void {
    this.s0 = state[0]
    this.s1 = state[1]
    this.s2 = state[2]
    this.s3 = state[3]

    // xoshiro generators cannot escape an all-zero state.
    if ((this.s0 | this.s1 | this.s2 | this.s3) === 0) {
      this.s0 = 0x6d_2b_79_f5
    }
  }

  override get name() {
    return 'xoshiro128**'
  }

  override next() {
    // Combine the high 27 and 26 bits of two outputs to fill all 53 bits of a
    // JavaScript number's significand.
    const high = this.nextUint32() >>> 5
    const low = this.nextUint32() >>> 6

    return (high * UINT26_SIZE + low) / UINT53_SIZE
  }

  override clone() {
    const clone = new Xoshiro128StarStarRNG(this._seed)

    clone.setState([this.s0, this.s1, this.s2, this.s3])

    return clone
  }

  protected nextUint32(): number {
    const result = Math.imul(rotateLeft(Math.imul(this.s1, 5), 7), 9) >>> 0
    const t = this.s1 << 9

    this.s2 ^= this.s0
    this.s3 ^= this.s1
    this.s1 ^= this.s2
    this.s0 ^= this.s3
    this.s2 ^= t
    this.s3 = rotateLeft(this.s3, 11)

    return result
  }
}
