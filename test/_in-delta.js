export default (actual, expected, delta) => (
  expected - delta <= actual && actual <= expected + delta
)
