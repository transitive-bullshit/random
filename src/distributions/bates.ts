// import ow from 'ow'
import { Random } from '../random'
import { NumberValidator } from '../NumberValidator'

export default (random: Random, n = 1) => {
  new NumberValidator(n).isInt().isPositive()
  const irwinHall = random.irwinHall(n)

  return () => {
    return irwinHall() / n
  }
}
