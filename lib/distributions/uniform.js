import ow from 'ow'

export default (rng, min, max) {
  if (max === undefined) {
    max = (min === undefined ? 1 : min)
    min = 0
  }

  ow(min, os.number.label('min'))
  ow(max, os.number.label('max'))

  return rng() * (max - min) + min
}
