import ow from 'ow'

export default (random, n) => {
  ow(n, ow.number.integer.positive.label('n'))

  return random.irwinHall(n) / n
}
