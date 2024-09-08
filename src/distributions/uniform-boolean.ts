import type { Random } from '../random'

export function uniformBoolean(random: Random) {
  return () => {
    return random.next() >= 0.5
  }
}
