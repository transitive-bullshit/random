import ow from 'ow'

export default (random: { next: () => number }, alpha = 1) => {
  ow(alpha, ow.number.greaterThanOrEqual(0))
  const invAlpha = 1.0 / alpha

  return () => {
    return 1.0 / Math.pow(1.0 - random.next(), invAlpha)
  }
}
