/* eslint-disable react/no-danger */
import React, { Fragment, useEffect, useState } from 'react'
import addons from '@storybook/addons'
import styled from 'styled-components'
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

/**
 * Prism support
 *
 * inspired by
 * - https://github.com/storybooks/addon-jsx/blob/1a95e61290cd2f68bc2909c5bc8f7adc79345097/src/jsx.js
 * - https://codepen.io/eksch/pen/jukqf?editors=1010
 */
import Prism from './vendor/prism'
import globalStyle from './vendor/css'
import { ACTIONS, CONSTANTS } from './constants'

const prismStyle = document.createElement('style')
prismStyle.innerHTML = globalStyle
document.body.appendChild(prismStyle)

const NotesPanel = styled.div({
  margin: 10,
  overflow: 'auto',
})

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

  return Prism.highlight(preparedData, Prism.languages[data.type])
}

const Notes = ({ api, active, channel }) => {
  const [data, setData] = useState({})
  const [text, setText] = useState('')
  let stopListeningOnStory = null

  const onInit = options => {
    setData(options.data)
    setText(options.parameters)
  }

  useEffect(() => {
    // init prism properly
    Prism.highlightAll()
  }, [])

  useEffect(() => {
    // Listen to the notes and render it.
    channel.on(ACTIONS.init, onInit)

    // Clear the current data on every story change.
    stopListeningOnStory = api.onStory(() => {
      onInit({})
    })

    // This is some cleanup tasks when the Data panel is unmounting.
    return () => {
      if (stopListeningOnStory) {
        stopListeningOnStory()
      }

      channel.removeListener(ACTIONS.init, onInit)
    }
  }, [])

  if (!data || !active) {
    // do not render when tab is not active
    return null
  }

  let textAfterFormatted = ''
  try {
    textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : ''
  } catch (error) {
    // do nothing right now, just report
    console.error(error) // eslint-disable-line
  }

  let code = ''
  try {
    code = data.length && data.map(d => highlightCode(d))
  } catch (error) {
    // do nothing right now, just report
    console.error(error) // eslint-disable-line
  }

  return (
    <NotesPanel>
      {textAfterFormatted && (
        <Fragment>
          <h2>Notes</h2>
          <div dangerouslySetInnerHTML={{ __html: textAfterFormatted }} />
        </Fragment>
      )}
      {code &&
        code.map((c, idx) => (
          <Fragment key={data[idx].name}>
            <h2>{data[idx].name}</h2>
            <pre className={`language-${data[idx].type} line-numbers`}>
              <code dangerouslySetInnerHTML={{ __html: c }} />
            </pre>
          </Fragment>
        ))}
    </NotesPanel>
  )
}

// Register the addon with a unique name.
// https://storybook.js.org/addons/api/#addonapiregister
addons.register(CONSTANTS.addonName, api => {
  // Also need to set a unique name to the panel.
  addons.addPanel(CONSTANTS.panelId, {
    title: CONSTANTS.panelName,
    render: ({ active }) => (
      <Notes channel={addons.getChannel()} api={api} active={active} />
    ),
  })
})
