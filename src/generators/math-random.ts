import { RNG } from '../rng'

export class MathRandomRNG extends RNG {
  override get name() {
    return 'Math.random'
  }

  override next() {
    return Math.random()
  }

  override clone() {
    return new MathRandomRNG()
  }
}
