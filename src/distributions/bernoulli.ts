import type { Random } from '../random'
import { numberValidator } from '../validation'

export function bernoulli(random: Random, p = 0.5) {
  numberValidator(p).greaterThanOrEqual(0).lessThanOrEqual(1)

  return () => {
    return Math.min(1, Math.floor(random.next() + p))
  }
}
