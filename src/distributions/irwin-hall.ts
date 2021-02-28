import ow from 'ow-lite'
import { Random } from '../random'

export default (random: Random, n = 1) => {
  ow(n, ow.number.integer.gte(0))

  return () => {
    let sum = 0
    for (let i = 0; i < n; ++i) {
      sum += random.next()
    }

    return sum
  }
}
