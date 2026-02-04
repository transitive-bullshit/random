# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library providing a seedable random number generator with support for many statistical distributions. It serves as a modern replacement for the unmaintained `seedrandom` package.

## Common Commands

### Build & Development
- `pnpm build` - Build the project using tsup (outputs to `dist/`)
- `pnpm dev` - Build in watch mode
- `pnpm clean` - Remove the `dist/` directory

### Testing
- `pnpm test` - Run all tests (builds first, then runs lint, prettier, typecheck, and unit tests)
- `pnpm test:unit` - Run unit tests with vitest
- `pnpm test:lint` - Run ESLint
- `pnpm test:prettier` - Check code formatting
- `pnpm test:typecheck` - Run TypeScript type checking

### Running Single Tests
Use vitest's file-specific test runner:
```bash
pnpm vitest run src/distributions/normal.test.ts
```

Or run tests in watch mode for a specific file:
```bash
pnpm vitest watch src/distributions/normal.test.ts
```

## Architecture

### Core Components

**RNG (Random Number Generator)**
- Abstract base class in `src/rng.ts` defining the interface for all PRNGs
- Each RNG must implement `next()`, `clone()`, and `name` property
- Built-in generators in `src/generators/`:
  - `ARC4RNG` - ARC4-based PRNG (default when using a seed)
  - `MathRandomRNG` - Wraps `Math.random` (default with no seed)
  - `FunctionRNG` - Wraps any custom RNG function
  - `Xor128RNG` - XOR128-based PRNG

**Random Class**
- Main class in `src/random.ts` that provides the public API
- Uses composition with an RNG instance
- Memoizes distribution generators for efficiency (caches thunks by parameters)
- Default singleton instance exported from `src/index.ts`

**Distribution Pattern**
All distributions follow a consistent pattern:
1. Distribution functions are in `src/distributions/[name].ts`
2. Each distribution function takes `Random` instance and parameters
3. Returns a **thunk** (parameterless function) that generates samples
4. Co-located test files use `.test.ts` suffix (e.g., `normal.test.ts`)

Example:
```typescript
// Distribution implementation
export function uniform(random: Random, min = 0, max = 1) {
  return () => {  // Returns a thunk
    return random.next() * (max - min) + min
  }
}

// Usage
const dist = random.uniform(0, 10)
dist()  // Generate a sample
dist()  // Generate another sample
```

**Utility Functions**
- `createRNG()` - Factory that converts seeds/functions into RNG instances
- `shuffleInPlace()` - Fisher-Yates shuffle implementation
- `sparseFisherYates()` - O(k) time and space sampling without replacement using hash table

### Project Structure

```
src/
├── index.ts              # Main entry point, exports
├── random.ts             # Random class with all distribution methods
├── rng.ts                # RNG abstract base class
├── types.ts              # TypeScript type definitions
├── utils.ts              # Shared utility functions
├── validation.ts         # Parameter validation
├── generators/           # PRNG implementations
│   ├── arc4.ts
│   ├── math-random.ts
│   ├── function.ts
│   └── xor128.ts
└── distributions/        # Distribution implementations
    ├── [name].ts         # Distribution implementation
    └── [name].test.ts    # Co-located tests
```

### Build Configuration

- **TypeScript**: Modern config with strict mode, targets ES2020
- **tsup**: Dual package (ESM + CJS), outputs to `dist/` with sourcemaps and type declarations
- **Package Manager**: pnpm (specified in package.json)

## Code Style

### Formatting
Prettier configuration (no semicolons, single quotes, 2 spaces):
```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "none"
}
```

### ESLint
Uses `@fisch0920/eslint-config/node` with specific rules disabled:
- `@typescript-eslint/naming-convention`: off
- `@typescript-eslint/array-type`: off
- `unicorn/prefer-code-point`: off
- `unicorn/prefer-math-trunc`: off

### Conventions
- Tests are co-located with source files using `.test.ts` suffix
- All distribution methods return thunks for consistency and efficiency
- RNGs are immutable - use `clone()` to create independent instances
- Validation is handled in `validation.ts` with descriptive error messages
