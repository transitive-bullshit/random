import ow from 'ow'

export default (random, min, max) => {
  if (max === undefined) {
    max = (min === undefined ? 1 : min)
    min = 0
  }

  ow(min, ow.number.label('min'))
  ow(max, ow.number.label('max'))

  return () => {
    return random.next() * (max - min) + min
  }
}
