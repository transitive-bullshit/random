import ow from 'ow-lite'

export default (random, lambda = 1) => {
  ow(lambda, ow.number.positive)

  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
