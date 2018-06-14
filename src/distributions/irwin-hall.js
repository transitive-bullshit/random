import ow from 'ow-lite'

export default (random, n) => {
  ow(n, ow.number.integer.greaterThanOrEqual(0))

  return () => {
    let sum = 0
    for (let i = 0; i < n; ++i) {
      sum += random.next()
    }

    return sum
  }
}
