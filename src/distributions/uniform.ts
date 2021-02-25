import { Random } from '../random';
import ow from 'ow'

export default (random: Random, min: number = 0, max: number = 1) => {

  ow(min, ow.number)
  ow(max, ow.number)

  return () => {
    return random.next() * (max - min) + min
  }
}
