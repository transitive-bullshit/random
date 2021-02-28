import ow from 'ow-lite'
import { Random } from '../random'

export default (random: Random, p = 0.5) => {
  ow(p, ow.number.gte(0).lt(1))
  return () => {
    return (random.next() + p) | 0
  }
}
