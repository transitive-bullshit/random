import { Random } from '../random.js'
import { numberValidator } from '../validation.js'

export default (random: Random, p = 0.5) => {
  numberValidator(p).greaterThan(0).lessThan(1)
  const invLogP = 1.0 / Math.log(1.0 - p)

  return () => {
    return Math.floor(1 + Math.log(random.next()) * invLogP)
  }
}
