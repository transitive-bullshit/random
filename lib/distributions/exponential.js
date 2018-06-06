import ow from 'ow'

export default (random, lambda = 1) => {
  ow(lambda, ow.number.label('lambda'))

  return -Math.log(1 - random.next()) / lambda
}
