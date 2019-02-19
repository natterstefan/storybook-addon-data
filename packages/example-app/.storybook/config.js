import { addDecorator, configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

// Option defaults:
addDecorator(
  withOptions({
    addonPanelInRight: true,
  }),
)

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
