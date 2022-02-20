module.exports = {
  globals: {
    'vue-jest': {
      babelConfig: true,
    },

    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/middleware/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/plugins/**/*.ts',
    '<rootDir>/store/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },

  moduleFileExtensions: ['vue', 'js', 'ts', 'mjs'],

  moduleNameMapper: {
    '\\.module\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '#app': '<rootDir>/node_modules/nuxt3/dist/app/index.mjs',
    '#imports': '<rootDir>/node_modules/nuxt3/dist/pages/runtime/composables.mjs',
    '#meta': '<rootDir>/node_modules/nuxt3/dist/meta/runtime/index.mjs',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },

  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  testMatch: ['<rootDir>/**/*.spec.ts'],

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(mjs)$': 'babel-jest',
  },

  transformIgnorePatterns: ['node_modules/(?!@nuxt)/'],
}
