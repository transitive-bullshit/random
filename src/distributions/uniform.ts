import { type Random } from '../random'

export function uniform(random: Random, min = 0, max = 1) {
  return () => {
    return random.next() * (max - min) + min
  }
}
