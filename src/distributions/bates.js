// import ow from 'ow'

export default (random, n) => {
  // ow(n, ow.number.integer.positive.label('n'))
  const irwinHall = random.irwinHall(n)

  return () => {
    return irwinHall() / n
  }
}
