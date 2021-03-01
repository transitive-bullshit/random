import { Random } from '../random'
import { numberValidator } from '../validation'

const logFactorialTable = [
  0.0,
  0.0,
  0.69314718055994529,
  1.791759469228055,
  3.1780538303479458,
  4.7874917427820458,
  6.5792512120101012,
  8.5251613610654147,
  10.604602902745251,
  12.801827480081469
]

const logFactorial = (k: number) => {
  return logFactorialTable[k]
}

const logSqrt2PI = 0.91893853320467267

export default (random: Random, lambda = 1) => {
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
    const a = -0.059 + 0.02483 * b
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

        const k = Math.floor(((2 * a) / us + b) * u + lambda + 0.445) | 0
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
