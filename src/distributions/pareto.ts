import { Random } from '../random.js'
import { numberValidator } from '../validation.js'

export default (random: Random, alpha = 1) => {
  numberValidator(alpha).greaterThanOrEqual(0)
  const invAlpha = 1.0 / alpha

  return () => {
    return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
  }
}
