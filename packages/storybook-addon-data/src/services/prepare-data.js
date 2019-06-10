import { print } from 'graphql/language/printer'
/**
 * # GQL Support
 *
 * Docs
 * - https://github.com/apollographql/graphql-tag
 *
 * Example:
 *
 * ```js
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
 * ```js
 *   module: {
 *     rules: [
 *       {
 *         test: /\.(graphql|gql)$/,
 *         exclude: /node_modules/,
 *         loader: 'graphql-tag/loader',
 *       },
 *     ],
 *   },
 * ```
 */
const prepareData = data => {
  let preparedData = ''

  switch (data.type) {
    case 'graphql':
      // https://github.com/apollographql/graphql-tag/issues/144#issuecomment-360866112
      preparedData = print(data.data)
      break

    case 'json':
      // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Der_space_Parameter
      // 2 => space parameter
      preparedData = JSON.stringify(data.data, null, 2)
      break

    // everything else is neither manipulated or further formatted
    default:
      preparedData = data.data
  }

  return preparedData
}

export default prepareData
