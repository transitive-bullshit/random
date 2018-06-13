import ow from 'ow-shim'

export default (random, n) => {
  ow(n, ow.number.integer.positive)
  const irwinHall = random.irwinHall(n)

  return () => {
    return irwinHall() / n
  }
}
