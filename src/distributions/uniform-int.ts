import { Random } from '../random.js'
import { numberValidator } from '../validation.js'

export default (random: Random, min = 0, max = 1) => {
  if (max === undefined) {
    max = min === undefined ? 1 : min
    min = 0
  }

  numberValidator(min).isInt()
  numberValidator(max).isInt()

  return () => {
    return Math.floor(random.next() * (max - min + 1) + min)
  }
}
