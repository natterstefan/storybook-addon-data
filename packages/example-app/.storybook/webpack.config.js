module.exports = {
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(yml|yaml)$/i,
        use: 'raw-loader',
      },
    ],
  },
}
