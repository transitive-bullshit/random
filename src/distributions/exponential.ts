import type { Random } from '../random'
import { numberValidator } from '../validation'

export function exponential(random: Random, lambda = 1) {
  numberValidator(lambda).isPositive()

  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
