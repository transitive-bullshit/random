import type { Random } from '../random'
import { numberValidator } from '../validation'

export function uniformInt(random: Random, min?: number, max?: number) {
  if (max === undefined) {
    max = min === undefined ? 1 : min
    min = 0
  }
  min ??= 0

  numberValidator(min).isInt()
  numberValidator(max).isInt()

  return () => {
    return Math.floor(random.next() * (max - min + 1) + min)
  }
}
