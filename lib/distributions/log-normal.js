export default (random, ...args) => {
  return Math.exp(random.normal(...args))
}
