import { Random } from '../random'
import NumberValidator from '../NumberValidator'

export default (random: Random, lambda = 1) => {
  new NumberValidator(lambda).isPositive()
  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
