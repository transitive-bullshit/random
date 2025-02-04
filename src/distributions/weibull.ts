import type { Random } from '../random'
import { numberValidator } from '../validation'

export function weibull(random: Random, lambda: number, k: number) {
  numberValidator(lambda).greaterThan(0.0)
  numberValidator(k).greaterThan(0.0)
  return () => {
    const u = 1.0 - random.next()
    return lambda * Math.pow(-Math.log(u), 1.0 / k)
  }
}
