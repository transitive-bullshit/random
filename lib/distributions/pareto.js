import ow from 'ow'

export default (random, alpha) => {
  ow(alpha, ow.number.greaterThanOrEqual(0).label('alpha'))
  const invAlpha = 1.0 / alpha

  return () => {
    return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
  }
}
