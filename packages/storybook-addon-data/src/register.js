/* eslint-disable react/no-danger */
import React, { Fragment, useEffect, useState } from 'react'
import { STORY_CHANGED } from '@storybook/core-events'
import addons from '@storybook/addons'
/**
 * currently assumes you use and import .gql with webpack
 *
 * Docs: https://github.com/apollographql/graphql-tag
 *
 * Example:
 * ```
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
 * ```
 *   module: {
 *    rules: [
 *    {
 *      test: /\.(graphql|gql)$/,
 *      exclude: /node_modules/,
 *      loader: 'graphql-tag/loader',
 *    },
 *  ],
 *},
 * ```
 */
import { print } from 'graphql/language/printer'

import Markdown from './components/markdown'
import CodeBlock from './components/code-block'
import { ACTIONS, CONSTANTS } from './constants'

const highlightCode = data => {
  // 2 => space parameter
  // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Der_space_Parameter
  let preparedData = ''

  switch (data.type) {
    case 'graphql':
      // https://github.com/apollographql/graphql-tag/issues/144#issuecomment-360866112
      preparedData = print(data.data)
      break

    case 'json':
      preparedData = JSON.stringify(data.data, null, 2)
      break

    default:
      preparedData = data.data
  }

  return preparedData
}

const Data = ({ api, active }) => {
  // initial states
  const initialData = null
  const initalText = ''
  const [data, setData] = useState(initialData)
  const [text, setText] = useState(initalText)

  // helpers
  const onInit = options => {
    setData(options.data)
    setText(options.parameters)
  }

  // resets data tabs
  const onStoryChange = () => {
    setData(initialData)
    setText(initalText)
  }

  useEffect(() => {
    // Listen to certain events and act.
    api.on(ACTIONS.init, onInit)

    // Clear (reset) the current data on every story change
    api.on(STORY_CHANGED, onStoryChange)

    return () => {
      // cleanup tasks when the Data panel is unmounting
      api.off(ACTIONS.init, onInit)
      api.off(STORY_CHANGED, onStoryChange)
    }
  }, [])

  if (!data || !active) {
    // do not render when tab is not active
    return null
  }

  let code = ''
  try {
    code = data.length && data.map(d => highlightCode(d))
  } catch (error) {
    // do nothing right now, just report
    console.error(error) // eslint-disable-line
  }

  return (
    <div
      style={{
        margin: 10,
        overflow: 'auto',
      }}
    >
      <Markdown markdown={text} />
      {code &&
        code.map((c, idx) => (
          <Fragment key={data[idx].name}>
            <Markdown markdown={data[idx].notes} />
            <CodeBlock name={data[idx].name} code={c} type={data[idx].type} />
            <br />
          </Fragment>
        ))}
    </div>
  )
}

// Register the addon with a unique name.
// https://storybook.js.org/addons/api/#addonapiregister
addons.register(CONSTANTS.addonName, api => {
  // Also need to set a unique name to the panel.
  addons.addPanel(CONSTANTS.panelId, {
    title: CONSTANTS.panelName,
    render: ({ active }) => <Data api={api} active={active} />,
  })
})
