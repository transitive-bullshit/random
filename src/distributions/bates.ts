import ow from 'ow'
import { Random } from '../random';

export default (random: Random, n = 1) => {
  ow(n, ow.number.integer.positive)
  const irwinHall = random.irwinHall(n)

  return () => {
    return irwinHall() / n
  }
}
