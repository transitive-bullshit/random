import random from './random'
export * from './random'
export default random

// TODO: figure out tsconfig settings to remove this line
// (it also appears in the ESM version which is not what we want)
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('./random').default
