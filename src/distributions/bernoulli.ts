import ow from 'ow'

export default (random: { next: () => number }, p = 0.5) => {
  ow(p, ow.number.greaterThanOrEqual(0).lessThan(1))
  return () => {
    return (random.next() + p) | 0
  }
}
