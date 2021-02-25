import ow from 'ow'
import { Random } from '../random';

export default (random: Random, n = 1) => {
  ow(n, ow.number.integer.greaterThanOrEqual(0))

  return () => {
    let sum = 0
    for (let i = 0; i < n; ++i) {
      sum += random.next()
    }

    return sum
  }
}
