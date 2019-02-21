/* eslint-disable import/order */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withDataJson from 'storybook-addon-data'

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
    withDataJson([
      { name: 'data.json', type: 'json', data: dataJson },
      { name: 'data.js', type: 'javascript', data: dataJs },
      { name: 'data.gql', type: 'graphql', data: dataGql },
    ]),
  )
  .add(
    'with text',
    () => <Button {...dataJson} onClick={action('clicked')} />,
    {
      notes: 'This is a very simple Button and you can click on it.',
    },
  )
  .add('without description', () => (
    <Button {...dataJson} onClick={action('clicked')} />
  ))

storiesOf('Button', module).add('without data', () => (
  <Button {...dataJson} onClick={action('clicked')} />
))
