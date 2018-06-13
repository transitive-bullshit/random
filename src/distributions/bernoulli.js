// import ow from 'ow'

export default (random, p = 0.5) => {
  // ow(p, ow.number.greaterThan(0).lessThan(1).label('p'))

  return () => {
    return (random.next() + p) | 0
  }
}
