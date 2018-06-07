export default (random, ...args) => {
  const normal = random.normal(...args)

  return () => {
    return Math.exp(normal())
  }
}
