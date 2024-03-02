import { Random } from '../random.js'

export default (random: Random) => {
  return () => {
    return random.next() >= 0.5
  }
}
