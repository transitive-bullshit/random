import ow from 'ow-lite'

export default (random, alpha = 1) => {
  ow(alpha, ow.number.gte(0))
  const invAlpha = 1.0 / alpha

  return () => {
    return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
  }
}
