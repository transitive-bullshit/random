import { type Random } from '../random'
import { numberValidator } from '../validation'

const logFactorialTable = [
  0.0, 0.0, 0.693_147_180_559_945_29, 1.791_759_469_228_055,
  3.178_053_830_347_945_8, 4.787_491_742_782_045_8, 6.579_251_212_010_101_2,
  8.525_161_361_065_414_7, 10.604_602_902_745_251, 12.801_827_480_081_469
]

const logFactorial = (k: number) => {
  return logFactorialTable[k]
}

const logSqrt2PI = 0.918_938_533_204_672_67

export function poisson(random: Random, lambda = 1) {
  numberValidator(lambda).isPositive()

  if (lambda < 10) {
    // inversion method
    const expMean = Math.exp(-lambda)

    return () => {
      let p = expMean
      let x = 0
      let u = random.next()

      while (u > p) {
        u = u - p
        p = (lambda * p) / ++x
      }

      return x
    }
  } else {
    // generative method
    const smu = Math.sqrt(lambda)
    const b = 0.931 + 2.53 * smu
    const a = -0.059 + 0.024_83 * b
    const invAlpha = 1.1239 + 1.1328 / (b - 3.4)
    const vR = 0.9277 - 3.6224 / (b - 2)

    return () => {
      while (true) {
        let u
        let v = random.next()

        if (v <= 0.86 * vR) {
          u = v / vR - 0.43
          return Math.floor(
            ((2 * a) / (0.5 - Math.abs(u)) + b) * u + lambda + 0.445
          )
        }

        if (v >= vR) {
          u = random.next() - 0.5
        } else {
          u = v / vR - 0.93
          u = (u < 0 ? -0.5 : 0.5) - u
          v = random.next() * vR
        }

        const us = 0.5 - Math.abs(u)
        if (us < 0.013 && v > us) {
          continue
        }

        const k = Math.floor(((2 * a) / us + b) * u + lambda + 0.445)
        v = (v * invAlpha) / (a / (us * us) + b)

        if (k >= 10) {
          const t =
            (k + 0.5) * Math.log(lambda / k) -
            lambda -
            logSqrt2PI +
            k -
            (1 / 12.0 - (1 / 360.0 - 1 / (1260.0 * k * k)) / (k * k)) / k

          if (Math.log(v * smu) <= t) {
            return k
          }
        } else if (k >= 0) {
          const f = logFactorial(k) ?? 0

          if (Math.log(v) <= k * Math.log(lambda) - lambda - f) {
            return k
          }
        }
      }
    }
  }
}
