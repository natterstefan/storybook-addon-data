import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withDataJson from 'storybook-data-json'

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
    () => (
      <Button {...dataJson} onClick={action('clicked')}>
        Hello Button
      </Button>
    ),
    {
      notes: 'This is a very simple Button and you can click on it.',
    },
  )
  .add('without description', () => (
    <Button {...dataJson} onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add(
    'with some emoji',
    () => (
      <Button {...dataJson} onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </Button>
    ),
    {
      notes:
        'Here we use some emoji as the Button text. Doesn&apos;t it look nice?',
    },
  )
