import { Random } from '../random'
import NumberValidator from '../NumberValidator'

export default (random: Random, p = 0.5) => {
  new NumberValidator(p).greaterThanOrEqual(0).lessThan(1)

  return () => {
    return (random.next() + p) | 0
  }
}
