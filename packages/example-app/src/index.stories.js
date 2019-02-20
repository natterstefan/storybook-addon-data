import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import data from './data.json'

import Button from '.'

import withDataJson from 'storybook-data-json' // eslint-disable-line

storiesOf('Button', module)
  .addDecorator(withDataJson([{ name: 'data.json', type: 'json', data }])) // TODO: document available types
  .add(
    'with text',
    () => (
      <Button {...data} onClick={action('clicked')}>
        Hello Button
      </Button>
    ),
    {
      notes: 'This is a very simple Button and you can click on it.',
    },
  )
  .add('without description', () => (
    <Button {...data} onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add(
    'with some emoji',
    () => (
      <Button {...data} onClick={action('clicked')}>
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
