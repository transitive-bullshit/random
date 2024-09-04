import type { Seed } from './types'

export function processSeed(seed?: Seed): number {
  if (seed === undefined) {
    seed = crypto.randomUUID()
  }

  if (typeof seed === 'number') {
    return seed
  }

  const strSeed = `${seed}`
  let s = 0

  for (let k = 0; k < strSeed.length; ++k) {
    s ^= strSeed.charCodeAt(k) | 0
  }

  return s
}

export function mixKey(seed: number, key: number[]): number[] {
  const seedStr = `${seed}`
  let smear = 0
  let j = 0

  while (j < seedStr.length) {
    key[0xff & j] =
      0xff & ((smear ^= (key[0xff & j] ?? 0) * 19) + seedStr.charCodeAt(j++))
  }

  if (!key.length) {
    return [0]
  }

  return key
}
