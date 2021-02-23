import ow from 'ow'

export default (random: { irwinHall: (arg0: number) => any }, n = 1) => {
  ow(n, ow.number.integer.positive)
  const irwinHall = random.irwinHall(n)

  return () => {
    return irwinHall() / n
  }
}
