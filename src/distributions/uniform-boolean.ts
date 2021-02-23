export default (random: { next: () => number }) => {
  return () => {
    return (random.next() >= 0.5)
  }
}
