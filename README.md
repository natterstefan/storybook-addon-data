# Storybook-Data-JSON Addon

[![Dependencies](https://img.shields.io/david/natterstefan/storybook-data-json.svg)](https://github.com/natterstefan/storybook-data-json/blob/master/package.json)
[![DevDependencies](https://img.shields.io/david/dev/natterstefan/storybook-data-json.svg)](https://github.com/natterstefan/storybook-data-json/blob/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/natterstefan/storybook-data-json/badge.svg)](https://snyk.io/test/github/natterstefan/storybook-data-json)
[![GitHub license](https://img.shields.io/github/license/natterstefan/storybook-data-json.svg)](https://github.com/natterstefan/storybook-data-json/blob/master/LICENCE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Present a component's properties in Storybook.

## Getting started

```bash
npm i storybook-data-json --save
```

## Basic Usage

```js
// index.stories.js
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withDataJson from 'storybook-data-json'

import dataJson from './data.json'

import Card from '.'

storiesOf('Button', module)
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
```

And the `data.json`:

```json
{
  "title": "Click Me"
}
```

## Development - Getting started

Use `yarn` instead of `npm`, because we rely on [`yarn`'s `workspaces` feature](https://yarnpkg.com/lang/en/docs/workspaces/).

```bash
yarn # will invoke yarn bootstrap afterwards automatically
yarn watch # will watch for changes and transpile them with babel
yarn start # starts storybook (http://localhost:9001)
```

## Licence

[MIT](LICENCE)

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/natterstefan">
          <img width="150" height="150" src="https://github.com/natterstefan.png?v=3&s=150">
          </br>
          Stefan Natter
        </a>
        <div>
          <a href="https://twitter.com/natterstefan">
            <img src="https://img.shields.io/twitter/follow/natterstefan.svg?style=social&label=Follow" />
          </a>
        </div>
      </td>
    </tr>
  <tbody>
</table>
