import type { Random } from '../random'
import { numberValidator } from '../validation'

export function bernoulli(random: Random, p = 0.5) {
  numberValidator(p).greaterThanOrEqual(0).lessThan(1)

  return () => {
    return Math.floor(random.next() + p)
  }
}
