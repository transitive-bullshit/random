import ow from 'ow'

export default (random, p = 0.5) => {
  ow(p, ow.number.greaterThanOrEqual(0).lessThanOrEqual(1).label('p'))

  return () => {
    return (random.next() + p) | 0
  }
}
