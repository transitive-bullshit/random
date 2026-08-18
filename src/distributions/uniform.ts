import type { Random } from '../random'

export function uniform(random: Random, min?: number, max?: number) {
  if (max === undefined) {
    max = min === undefined ? 1 : min
    min = 0
  }
  min ??= 0

  return () => {
    return random.next() * (max - min) + min
  }
}
