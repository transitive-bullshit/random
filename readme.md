# random

> Seedable random number generator supporting many common distributions.

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

// quick uniform shortcuts
random.float(min = 0, max = 1) // alias for random.uniform
random.int(min = 0, max = 1) // [ min, max ]
random.boolean() // true or false

// uniform
random.uniform(min = 0, max = 1) // () => [ min, max )
random.uniformInt(min = 0, max = 1) // () => [ min, max ]
random.uniformBoolean() // () => [ false, true ]

// normal
random.normal(mu = 0, sigma = 1)
random.logNormal(mu = 0, sigma = 1)
random.chiSquared()
random.cauchy()
random.fisherF()
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

// underlying pseudo random number generator
random.use('rand48', seed, opts)
random.use(seedrandom('foobar'))

// creating an independent random number generator
const rng = random.clone(seed, opts)

rng.patch()
rng.unpatch()
```

## API

```js
RNG(seed, opts)
  - name: string
  - next(): number // [ 0, 1 )
  - clone(seed, opts)
```

## Related

- [d3-random](https://github.com/d3/d3-random)
- [seedrandom](https://github.com/davidbau/seedrandom)
- [randombytes](https://github.com/crypto-browserify/randombytes)

## License

Huge shoutout to [Roger Combs](https://github.com/rcombs) for donating the `random` npm package for this project!

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
