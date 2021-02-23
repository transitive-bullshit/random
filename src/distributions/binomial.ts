import ow from 'ow'

export default (random: { next: () => number }, n = 1, p = 0.5) => {
  ow(n, ow.number.positive.integer)
  ow(p, ow.number.greaterThanOrEqual(0).lessThan(1))

  return () => {
    let i = 0
    let x = 0

    while (i++ < n) {
      if(random.next() < p){
        x++
      }
    }
    return x
  }
}
