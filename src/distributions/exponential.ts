import ow from 'ow'
import { Random } from '../random';

export default (random: Random, lambda = 1) => {
  ow(lambda, ow.number.positive)
  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
