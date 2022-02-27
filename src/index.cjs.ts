import * as symbols from './index'

import random from './index'

Object.assign(random, symbols)

// TODO: figure out tsconfig settings to remove this line
// (it also appears in the ESM version which is not what we want)
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = random
