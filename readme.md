# random

> Seedable random number generator supporting many common distributions.
> AKA **The most random module on npm.**

[![NPM](https://img.shields.io/npm/v/random.svg)](https://www.npmjs.com/package/random) [![Build Status](https://travis-ci.com/transitive-bullshit/random.svg?branch=master)](https://travis-ci.com/transitive-bullshit/random) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Status

This module is an active WIP. Please stay tuned...

## Install

```bash
npm install --save random
```

## Usage

```js
const random = require('random')

random() // alias for random.uniform

// uniform
random.uniform(min = 0, max = 1) // [ min, max )
random.float(min = 0, max = 1) // alias for random.uniform
random.int(min = 0, max = 1) // [ min, max )
random.boolean() // true or false

// normal
random.normal(mu = 0, sigma = 1)
random.logNormal(mu = 0, sigma = 1)
random.chiSquared()
random.cauchy()
random.fisher()
random.studentT()

// bernoulli
random.bernoulli(p)
random.binomial(n, p)
random.negativeBinomial(n, p)
random.geometric(p)

// poisson
random.poisson()
random.exponential(lambda = 1)
random.gamma()
random.hyperExponential()
random.weibull()
random.beta()
random.laplace()

// misc
random.bates()
random.irwinHall()
random.pareto(alpha)

random.use('rand48', seed, opts)
random.use(seedrandom('foobar'))
random.seed('foobar') // alias for random.rng.seed

const rng = random.clone(seed, opts)

rng.patch()
rng.unpatch()
```

## API

```js
RandomNumberGenerator(seed, opts)
  - next(): number // [ 0, 1 )
  - name: string
  - seed(seed, opts)
  - clone(seed, opts)
```

## Related

https://github.com/crypto-browserify/randombytes

- [d3-random](https://github.com/d3/d3-random)
- [seedrandom](https://github.com/davidbau/seedrandom)

## License

Huge shoutout to [Roger Combs](https://github.com/rcombs) for donating the `random` npm package for this project!

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
