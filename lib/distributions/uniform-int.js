import ow from 'ow'

export default (random, min, max) => {
  if (max === undefined) {
    max = (min === undefined ? 1 : min)
    min = 0
  }

  ow(min, ow.number.integer.label('min'))
  ow(max, ow.number.integer.label('max'))

  return (random.next() * (max - min + 1) + min) | 0
}
