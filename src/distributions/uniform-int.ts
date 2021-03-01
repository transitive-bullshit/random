import { Random } from '../random'
import NumberValidator from '../NumberValidator'

export default (random: Random, min = 0, max = 1) => {
  if (max === undefined) {
    max = min === undefined ? 1 : min
    min = 0
  }

  new NumberValidator(min).isInt()
  new NumberValidator(max).isInt()

  return () => {
    return (random.next() * (max - min + 1) + min) | 0
  }
}
