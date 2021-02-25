import { Random } from '../random';

export default (random: Random) => {
  return () => {
    return (random.next() >= 0.5)
  }
}
