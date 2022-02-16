module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/middleware/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/plugins/**/*.js',
    '<rootDir>/store/**/*.js',
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

  moduleFileExtensions: ['vue', 'js', 'ts'],

  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  testMatch: ['<rootDir>/**/*.spec.ts'],

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
}
