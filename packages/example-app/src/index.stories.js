/* eslint-disable import/order */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withData, { withDataWrapper } from 'storybook-addon-data'

/**
 * created with
 * - https://prismjs.com/test.html
 */
import dataJson from './data.json'
import dataJs from './data'
// requires https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader
import dataGql from './data.gql'

import Button from '.'

storiesOf('Button', module)
  // TODO: document available types
  .addDecorator(
    withData([
      { name: 'data.json', type: 'json', data: dataJson },
      { name: 'data.js', type: 'javascript', data: dataJs },
      { name: 'data.gql', type: 'graphql', data: dataGql },
    ]),
  )
  .add(
    'with text',
    // storyFn
    () => <Button {...dataJson} onClick={action('clicked')} />,
    // parameters
    {
      notes: 'This is a very simple Button and you can click on it.',
    },
  )
  .add('without description', () => (
    <Button {...dataJson} onClick={action('clicked')} />
  ))

storiesOf('Button', module).add(
  'with withData HoC',
  withDataWrapper(
    [
      { name: 'data.json', type: 'json', data: dataJson, prop: 'json' }, // available on props.json
      { name: 'data.js', type: 'javascript', data: dataJs, prop: 'js' }, // available on props.js
      { name: 'data.gql', type: 'graphql', data: dataGql }, // no prop => not available on props
    ],
    props => <Button {...props.json} onClick={action('clicked')} />,
  ),
  // parameters
  {
    notes: 'This is a very simple Button and you can click on it.',
  },
)

storiesOf('Button', module).add('without data', () => (
  <Button {...dataJson} onClick={action('clicked')} />
))
