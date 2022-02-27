import { Random } from '../random.js'

export default (random: Random, min = 0, max = 1) => {
  return () => {
    return random.next() * (max - min) + min
  }
}
