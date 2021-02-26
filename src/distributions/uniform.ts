import { Random } from '../random'

export default (random: Random, min: number = 0, max: number = 1) => {
  return () => {
    return random.next() * (max - min) + min
  }
}
