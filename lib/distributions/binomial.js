import ow from 'ow'

export default (random, n, p = 0.5) => {
  ow(n, ow.number.positive.integer.label('n'))
  ow(p, ow.number.greaterThanOrEqual(0).lessThanOrEqual(1).label('p'))

  return () => {
    let i = 0
    let x = 0

    while (i++ < n) {
      x += (random.next() < p)
    }

    return x
  }
}
