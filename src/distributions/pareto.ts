import { Random } from '../random'
import NumberValidator from '../NumberValidator'

export default (random: Random, alpha = 1) => {
  new NumberValidator(alpha).greaterThanOrEqual(0)
  const invAlpha = 1.0 / alpha

  return () => {
    return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
  }
}
