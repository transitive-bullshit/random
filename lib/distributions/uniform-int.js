import ow from 'ow'

export default (rng, min, max) => {
  if (max === undefined) {
    max = (min === undefined ? 1 : min)
    min = 0
  }

  ow(min, ow.number.integer.label('min'))
  ow(max, ow.number.integer.label('max'))

  return (rng() * (max - min + 1) + min) | 0
}
