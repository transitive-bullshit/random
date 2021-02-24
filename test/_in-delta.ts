export default (actual: number, expected: number, delta: number) => (
  expected - delta <= actual && actual <= expected + delta
)
