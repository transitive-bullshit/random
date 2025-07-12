export function numberValidator(num: number) {
  return new NumberValidator(num)
}

export class NumberValidator {
  private n: number
  constructor(num: number) {
    this.n = num
  }

  public isInt = (): this => {
    if (Number.isInteger(this.n)) {
      return this
    }
    throw new Error(`Expected number to be an integer, got ${this.n}`)
  }

  public isPositive = (): this => {
    if (this.n > 0) {
      return this
    }
    throw new Error(`Expected number to be positive, got ${this.n}`)
  }

  public lessThan = (v: number): this => {
    if (this.n < v) {
      return this
    }
    throw new Error(`Expected number to be less than ${v}, got ${this.n}`)
  }

  public lessThanOrEqual = (v: number): this => {
    if (this.n <= v) {
      return this
    }
    throw new Error(
      `Expected number to be less than or equal to ${v}, got ${this.n}`
    )
  }

  public greaterThanOrEqual = (v: number): this => {
    if (this.n >= v) {
      return this
    }
    throw new Error(
      `Expected number to be greater than or equal to ${v}, got ${this.n}`
    )
  }

  public greaterThan = (v: number): this => {
    if (this.n > v) {
      return this
    }
    throw new Error(`Expected number to be greater than ${v}, got ${this.n}`)
  }
}
