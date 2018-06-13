import ow from 'ow-shim'

export default (random, n = 1, p = 0.5) => {
  ow(n, ow.number.positive.integer)
  ow(p, ow.number.greaterThanOrEqual(0).lessThanOrEqual(1))

  return () => {
    let i = 0
    let x = 0

    while (i++ < n) {
      x += (random.next() < p)
    }

    return x
  }
}
