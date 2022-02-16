module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
            useBuiltIns: 'usage',
            targets: '> 0.5%, last 2 versions, firefox ESR, ie 11',
            bugfixes: true,
            corejs: {
              version: 3,
              proposals: true,
            },
          },
        ],
      ],
    },
  },
}
