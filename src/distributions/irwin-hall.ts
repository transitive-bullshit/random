import type { Random } from '../random'
import { numberValidator } from '../validation'

export function irwinHall(random: Random, n = 1) {
  numberValidator(n).isInt().greaterThanOrEqual(0)

  return () => {
    let sum = 0
    for (let i = 0; i < n; ++i) {
      sum += random.next()
    }

    return sum
  }
}
