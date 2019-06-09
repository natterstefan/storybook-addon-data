const path = require('path')

module.exports = {
  extends: 'eslint-config-ns',
  rules: {
    'class-methods-use-this': 0,
    'import/no-named-as-default': 0,
    'react/prop-types': 0,
    'sort-keys': 0,
  },
  overrides: [
    {
      files: ['*.test.js', '*.stories.js'],
      globals: {
        cy: true, // cypress
      },
      rules: {
        'import/no-extraneous-dependencies': 0,
        'jest/expect-expect': 0, // because we do not use jest, but cypress
        'no-console': 0,
        'react/prop-types': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: path.resolve(__dirname, 'packages'),
      },
    },
  },
}
