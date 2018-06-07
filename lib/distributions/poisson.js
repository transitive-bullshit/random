import ow from 'ow'

export default (random, mean = 1) => {
  ow(mean, ow.number.positive.label('mean'))

  // TODO: handle inversion vs generate from boost
  const l = Math.exp(-mean)

  return () => {
    let k = 0
    let p = 1

    do {
      ++k
      p += random.next()
    } while (p > l)

    return k - 1
  }
}
