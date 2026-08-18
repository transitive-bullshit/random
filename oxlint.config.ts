import config from '@fisch0920/config/oxlint'

export default {
  extends: [config],
  rules: {
    'unicorn/prefer-code-point': 'off',
    'unicorn/prefer-math-trunc': 'off'
  }
}
