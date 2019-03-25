import { addParameters, configure } from '@storybook/react'
import { create } from '@storybook/theming'

// storybook options
addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'natterstefan',
      brandUrl: 'https://natterstefan.me',
    }),
    panelPosition: 'right',
  },
})

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
