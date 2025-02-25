import type { Seed } from '../types'
import { RNG } from '../rng'
import { mixKey } from '../utils'

//
// ARC4
//
// An ARC4 implementation. The constructor takes a key in the form of an array
// of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates the
// next (count) outputs from ARC4. Its return value is a number x that is in
// the range 0 <= x < (width ^ count).

// The following constants are related to IEEE 754 limits.
// const width = 256 // each RC4 output is 0 <= x < 256
// const chunks = 6 // at least six RC4 outputs for each double
const _arc4_startdenom = 281_474_976_710_656 // 256 ** 6 == width ** chunks
const _arc4_significance = 4_503_599_627_370_496 // 2 ** 52 significant digits in a double
const _arc4_overflow = 9_007_199_254_740_992 // 2 ** 53 == significance * 2

export class ARC4RNG extends RNG {
  protected readonly _seed: Seed

  i: number
  j: number
  S: number[]

  constructor(seed: Seed = crypto.randomUUID()) {
    super()

    this._seed = seed
    const key = mixKey(seed, [])

    const S: number[] = []
    const keylen = key.length
    this.i = 0
    this.j = 0
    this.S = S

    // Set up S using the standard key scheduling algorithm.
    let i = 0
    while (i <= 0xff) {
      S[i] = i++
    }

    for (let i = 0, j = 0; i <= 0xff; i++) {
      const t = S[i]!
      j = 0xff & (j + key[i % keylen]! + t)
      S[i] = S[j]!
      S[j] = t
    }

    // For more robust unpredictability, the function call below discards an
    // initial batch of values. This is called RC4-drop.
    this.g(256)
  }

  override get name() {
    return 'arc4'
  }

  override next() {
    // This function returns a random double in [0, 1) that contains
    // randomness in every bit of the mantissa of the IEEE 754 value.

    let n = this.g(6) // Start with a numerator n < 2 ^ 48
    let d = _arc4_startdenom // and denominator d = 2 ^ 48.
    let x = 0 // and no 'extra last byte'.

    while (n < _arc4_significance) {
      // Fill up all significant digits (2 ** 52)
      n = (n + x) * 256 // by shifting numerator and
      d *= 256 // denominator and generating a
      x = this.g(1) // new least-significant-byte.
    }

    while (n >= _arc4_overflow) {
      // To avoid rounding past overflow, before adding
      n /= 2 // last byte, shift everything
      d /= 2 // right using integer math until
      x >>>= 1 // we have exactly the desired bits.
    }

    return (n + x) / d // Form the number within [0, 1).
  }

  g(count: number) {
    const { S } = this
    let { i, j } = this
    let r = 0

    while (count--) {
      i = 0xff & (i + 1)
      const t = S[i]!
      S[j] = t
      j = 0xff & (j + t)
      S[i] = S[j]!
      r = r * 256 + S[0xff & (S[i]! + t)]!
    }

    this.i = i
    this.j = j

    return r
  }

  override clone() {
    return new ARC4RNG(this._seed)
  }
}
