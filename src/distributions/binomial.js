import ow from 'ow-lite'

export default (random, n = 1, p = 0.5) => {
  ow(n, ow.number.positive.integer)
  ow(p, ow.number.gte(0).lte(1))

  return () => {
    let i = 0
    let x = 0

    while (i++ < n) {
      x += (random.next() < p)
    }

    return x
  }
}
