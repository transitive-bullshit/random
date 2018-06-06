import ow from 'ow'

export default (rng, mu = 0, sigma = 1) {
  ow(mu, os.number.label('mu'))
  ow(sigma, os.number.label('sigma'))
  let x, y, r

  do {
    x = rng() * 2 - 1
    y = rng() * 2 - 1
    r = x * x + y * y
  } while (!r || r > 1)

  return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r)
}
