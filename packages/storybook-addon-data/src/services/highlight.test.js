import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

import highlight from './highlight'

describe('services/highlight', () => {
  const obj = {
    data: { test: 1 },
    type: 'json',
  }

  const query = gql`
    {
      user(id: 5) {
        firstName
        lastName
      }
    }
  `
  const objGql = {
    data: query,
    type: 'graphql',
  }

  const objOther = {
    data: 'console.log("test")',
    type: 'js',
  }

  it('shall return json formatted correctly', () => {
    const prepJson = JSON.stringify(obj.data, null, 2)
    expect(highlight(obj)).toStrictEqual(prepJson)
  })

  it('shall return graphql formatted correctly', () => {
    const prepJson = print(objGql.data)
    expect(highlight(objGql)).toStrictEqual(prepJson)
  })

  it('shall return any other format as is', () => {
    expect(highlight(objOther)).toStrictEqual('console.log("test")')
  })
})
