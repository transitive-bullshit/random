import { Random } from '../random'
import NumberValidator from '../NumberValidator'

export default (random: Random, n = 1, p = 0.5) => {
  new NumberValidator(n).isInt().isPositive()
  new NumberValidator(p).greaterThanOrEqual(0).lessThan(1)

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
