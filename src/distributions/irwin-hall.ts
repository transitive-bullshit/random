import { Random } from '../random'
import NumberValidator from '../NumberValidator'

export default (random: Random, n = 1) => {
  new NumberValidator(n).isInt().greaterThanOrEqual(0)

  return () => {
    let sum = 0
    for (let i = 0; i < n; ++i) {
      sum += random.next()
    }

    return sum
  }
}
