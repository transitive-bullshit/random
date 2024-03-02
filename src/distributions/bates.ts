import { Random } from '../random.js'
import { numberValidator } from '../validation.js'

export default (random: Random, n = 1) => {
  numberValidator(n).isInt().isPositive()
  const irwinHall = random.irwinHall(n)

  return () => {
    return irwinHall() / n
  }
}
