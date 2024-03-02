import { Random } from '../random.js'
import { numberValidator } from '../validation.js'

export default (random: Random, p = 0.5) => {
  numberValidator(p).greaterThanOrEqual(0).lessThan(1)

  return () => {
    return Math.floor(random.next() + p)
  }
}
