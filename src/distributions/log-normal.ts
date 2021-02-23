// TODO: Type
export default (random: any, ...args: any[]) => {
  const normal = random.normal(...args)
  return () => {
    return Math.exp(normal())
  }
}
