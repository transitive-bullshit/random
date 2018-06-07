import ow from 'ow'

export default (random, lambda = 1) => {
  ow(lambda, ow.number.positive.label('lambda'))

  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
