# random

> Seedable random number generator supporting many common distributions.

[![NPM](https://img.shields.io/npm/v/random.svg)](https://www.npmjs.com/package/random) [![Build Status](https://travis-ci.com/transitive-bullshit/random.svg?branch=master)](https://travis-ci.com/transitive-bullshit/random) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Wanna work with random numbers in javaScript, but `Math.random` isn't cutting it?

Then welcome to the most **random** module on npm!

## Highlights

- Simple API (make easy things easy and hard things possible)
- Seedable based on entropy or user input
- Plugin support for different pseudo random number generators (PRNGs)
- Sample from many common distributions
  - uniform, normal, poisson, bernoulli, etc
- Validates all user input via [ow](https://github.com/sindresorhus/ow)
- Integrates with [seedrandom](https://github.com/davidbau/seedrandom)
- Supports node >= 4 and browser

## Install

**NOTE**: This module is currently an active WIP, and we do not recommend using it yet.

```bash
npm install --save random
```

## Usage

```js
const random = require('random')

// quick uniform shortcuts
random.float(min = 0, max = 1) // uniform float in [ min, max )
random.int(min = 0, max = 1) // uniform integer in [ min, max ]
random.boolean() // true or false

// uniform
random.uniform(min = 0, max = 1) // () => [ min, max )
random.uniformInt(min = 0, max = 1) // () => [ min, max ]
random.uniformBoolean() // () => [ false, true ]

// normal
random.normal(mu = 0, sigma = 1)
random.logNormal(mu = 0, sigma = 1)

// bernoulli
random.bernoulli(p)
random.binomial(n, p)
random.geometric(p)

// poisson
random.poisson()
random.exponential(lambda = 1)

// misc
random.irwinHall()
random.bates()
random.pareto(alpha)
```

For convenience, several common uniform samplers are exposed directly:

```js
random.float()     // 0.2149383367670885
random.int(0, 100) // 72
random.boolean()   // true
```

All distribution methods return a thunk (function with no params), which will return
a series of independent, identically distributed random variables from the distribution.
which was created.

Note that returning a thunk here is more efficient when generating multiple
samples from the same distribution.

```js
// create a normal distribution with default params (mu=1 and sigma=0)
const normal = random.normal()
normal() // 0.4855465422678824
normal() // -0.06696771815439678
normal() // 0.7350852689834705

// create a poisson distribution with default params (lambda=1)
const poisson = random.poisson()
poisson() // 0
poisson() // 4
poisson() // 1
```

You can change the underlying PRNG or its seed as follows:

```js
const seedrandom = require('seedrandom')

// change the underlying pseudo random number generator
// by default, Math.random is used as the underlying PRNG
random.use(seedrandom('foobar'))

// create an independent random number generator
const rng = random.clone('my-new-seed')

// create a second independent random number generator and use a seeded PRNG
const rng2 = random.clone(seedrandom('kittyfoo'))

// replace Math.random with rng.uniform
rng.patch()

// restore original Math.random
rng.unpatch()
```

## API

TODO

## Todo

- Distributions
  - [x] uniform
  - [x] uniformInt
  - [x] uniformBoolean
  - [x] normal
  - [x] logNormal
  - [ ] chiSquared
  - [ ] cauchy
  - [ ] fischerF
  - [ ] studentT
  - [x] bernoulli
  - [x] binomial
  - [ ] negativeBinomial
  - [x] geometric
  - [x] poisson
  - [x] exponential
  - [ ] gamma
  - [ ] hyperExponential
  - [ ] weibull
  - [ ] beta
  - [ ] laplace
  - [x] irwinHall
  - [x] bates
  - [x] pareto

- Generators
  - [x] pluggable prng
  - [ ] more prng from boost
  - [ ] custom entropy

- Misc
  - [ ] browser support via webpack
  - [ ] basic docs
  - [ ] basic tests
  - [ ] first release!

## Related

- [d3-random](https://github.com/d3/d3-random)
- [seedrandom](https://github.com/davidbau/seedrandom)
- [random-int](https://github.com/sindresorhus/random-int) - For the common use case of generating uniform random ints.
- [random-float](https://github.com/sindresorhus/random-float) - For the common use case of generating uniform random floats.
- [randombytes](https://github.com/crypto-browserify/randombytes) -

## Credit

Huge shoutout to [Roger Combs](https://github.com/rcombs) for donating the `random` npm package for this project!

Lots of inspiration from [@mbostock](https://github.com/mbostock) and [@svanschooten](https://github.com/svanschooten)'s work on [d3-random](https://github.com/d3/d3-random).

Some distributions and PRNGs are ported from C++ [boost::random](https://www.boost.org/doc/libs/1_66_0/doc/html/boost_random/reference.html#boost_random.reference.distributions).

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
