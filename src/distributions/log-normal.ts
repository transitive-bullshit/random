import { Random } from '../random.js'

export default (random: Random, mu = 0, sigma = 1) => {
  const normal = random.normal(mu, sigma)
  return () => {
    return Math.exp(normal())
  }
}
