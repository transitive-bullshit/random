import ow from 'ow'
import { Random } from '../random'

export default (random: Random, p = 0.5) => {
  ow(p, ow.number.greaterThanOrEqual(0).lessThan(1))
  return () => {
    return (random.next() + p) | 0
  }
}
