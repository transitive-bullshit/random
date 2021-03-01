import { Random } from '../random'
import { numberValidator } from '../validation'

export default (random: Random, min = 0, max = 1) => {
  if (max === undefined) {
    max = min === undefined ? 1 : min
    min = 0
  }

  numberValidator(min).isInt()
  numberValidator(max).isInt()

  return () => {
    return (random.next() * (max - min + 1) + min) | 0
  }
}
