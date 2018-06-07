export default (random) => {
  return () => {
    return (random.next() >= 0.5)
  }
}
