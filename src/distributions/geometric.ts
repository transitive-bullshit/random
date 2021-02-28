import { Random } from '../random'
import NumberValidator from '../NumberValidator'

export default (random: Random, p = 0.5) => {
  new NumberValidator(p).greaterThan(0).lessThan(1)
  const invLogP = 1.0 / Math.log(1.0 - p)
  return () => {
    return (1 + Math.log(random.next()) * invLogP) | 0
  }
}
