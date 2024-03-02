import { Random } from '../random.js'
import { numberValidator } from '../validation.js'

export default (random: Random, lambda = 1) => {
  numberValidator(lambda).isPositive()

  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
