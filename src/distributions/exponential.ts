import { Random } from '../random'
import { numberValidator } from '../validation'

export default (random: Random, lambda = 1) => {
  numberValidator(lambda).isPositive()

  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
