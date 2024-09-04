export abstract class RNG {
  abstract get name(): string

  abstract next(): number

  abstract clone(): RNG
}
