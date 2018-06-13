import ow from 'ow-shim'

export default (random, p = 0.5) => {
  ow(p, ow.number.greaterThan(0).lessThan(1))

  return () => {
    return (random.next() + p) | 0
  }
}
