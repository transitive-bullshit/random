import type { Random } from '../random'

export function normal(random: Random, mu = 0, sigma = 1) {
  return () => {
    let x: number, y: number, r: number

    do {
      x = random.next() * 2 - 1
      y = random.next() * 2 - 1
      r = x * x + y * y
    } while (!r || r > 1)

    return mu + sigma * y * Math.sqrt((-2 * Math.log(r)) / r)
  }
}
