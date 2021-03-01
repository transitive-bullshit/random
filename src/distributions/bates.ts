import { Random } from '../random'
import { numberValidator } from '../validation'

export default (random: Random, n = 1) => {
  numberValidator(n).isInt().isPositive()
  const irwinHall = random.irwinHall(n)

  return () => {
    return irwinHall() / n
  }
}
