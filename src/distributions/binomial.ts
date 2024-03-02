import { Random } from '../random.js'
import { numberValidator } from '../validation.js'

export default (random: Random, n = 1, p = 0.5) => {
  numberValidator(n).isInt().isPositive()
  numberValidator(p).greaterThanOrEqual(0).lessThan(1)

  return () => {
    let i = 0
    let x = 0

    while (i++ < n) {
      if (random.next() < p) {
        x++
      }
    }
    return x
  }
}
