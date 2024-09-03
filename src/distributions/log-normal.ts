import { type Random } from '../random'

export function logNormal(random: Random, mu = 0, sigma = 1) {
  const normal = random.normal(mu, sigma)
  return () => {
    return Math.exp(normal())
  }
}
