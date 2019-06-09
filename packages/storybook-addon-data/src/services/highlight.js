import { print } from 'graphql/language/printer'
/**
 * currently assumes project uses and imports `.gql` with webpack
 *
 * Docs: https://github.com/apollographql/graphql-tag
 *
 * Example:
 * ```
 * import dataGql from './data.gql'
 *
 * storiesOf('Button', module)
 *  .addDecorator(
 *    withDataJson([
 *       { name: 'data.gql', type: 'graphql', data: dataGql },
 *    ]),
 *   )
 *  .add(....)
 * ```
 *
 * with the following webpack.config.js
 *
 * ```
 *   module: {
 *    rules: [
 *    {
 *      test: /\.(graphql|gql)$/,
 *      exclude: /node_modules/,
 *      loader: 'graphql-tag/loader',
 *    },
 *  ],
 *},
 * ```
 */
const highlightCode = data => {
  // 2 => space parameter
  // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Der_space_Parameter
  let preparedData = ''

  switch (data.type) {
    case 'graphql':
      // https://github.com/apollographql/graphql-tag/issues/144#issuecomment-360866112
      preparedData = print(data.data)
      break

    case 'json':
      preparedData = JSON.stringify(data.data, null, 2)
      break

    // everything else is neither manipulated or further formatted
    default:
      preparedData = data.data
  }

  return preparedData
}

export default highlightCode
