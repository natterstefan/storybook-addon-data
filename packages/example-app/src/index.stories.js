/* eslint-disable import/order */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withData, { withDataWrapper } from 'storybook-addon-data'

import README from '../README.md'
import README_JSON from './README_JSON.md'

import dataJs from './data'
import dataJson from './data.json'
import dataYaml from './data.yaml'
// requires https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader
import dataGql from './data.gql'

import Button from '.'

const onClick = action('clicked')

storiesOf('Button', module)
  .addDecorator(
    withData([
      { name: 'data.json', type: 'json', data: dataJson, notes: README_JSON },
      { name: 'data.js', type: 'javascript', data: dataJs },
      { name: 'data.gql', type: 'graphql', data: dataGql },
      { name: 'data.yaml', type: 'yaml', data: dataYaml },
    ]),
  )
  .add(
    'with text',
    // storyFn
    () => <Button {...dataJson} onClick={onClick} />,
    // parameters
    {
      // storybook-addon-data supports markdown here as well
      notes: README,
      // or
      // notes: 'withData: This is a very simple Button and you can click on it.',
    },
  )
  .add('without story parameters', () => (
    <Button {...dataJson} onClick={onClick} />
  ))

storiesOf('Button', module).add(
  'with withData HoC',
  withDataWrapper(
    [
      // available on props.json
      {
        name: 'data.json',
        type: 'json',
        data: dataJson,
        prop: 'json',
        notes: README,
      },
      // available on props.js
      { name: 'data.js', type: 'javascript', data: dataJs, prop: 'js' },
      // no prop => not available on props
      { name: 'data.gql', type: 'graphql', data: dataGql },
    ],
    props => <Button {...props.json} onClick={onClick} />,
  ),
)

storiesOf('Button', module).add('without data', () => (
  <Button {...dataJson} onClick={onClick} />
))
