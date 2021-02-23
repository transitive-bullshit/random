import ow from 'ow'

export default (random: { next: () => number }, lambda = 1) => {
  ow(lambda, ow.number.positive)
  return () => {
    return -Math.log(1 - random.next()) / lambda
  }
}
