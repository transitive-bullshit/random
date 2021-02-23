import ow from 'ow'

export default (random: { next: () => number }, p = 0.5) => {
  ow(p, ow.number.greaterThan(0).lessThan(1))
  const invLogP = 1.0 / Math.log(1.0 - p)
  return () => {
    return 1 + (Math.log(random.next()) * invLogP) | 0
  }
}
