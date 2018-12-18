import ow from 'ow-lite'

export default (random, p = 0.5) => {
  ow(p, ow.number.gte(0).lt(1))

  return () => {
    return (random.next() + p) | 0
  }
}
