/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
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
import Prism from './prism'
import globalStyle from './css'

const prismStyle = document.createElement('style')
prismStyle.innerHTML = globalStyle
document.body.appendChild(prismStyle)

const NotesPanel = styled.div({
  margin: 10,
  overflow: 'auto',
})

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      text: '',
    }

    this.onAddNotes = this.onAddNotes.bind(this)
  }

  componentDidMount() {
    const { channel, api } = this.props
    // Listen to the notes and render it.
    channel.on('natterstefan/storybook-addon-data/init', this.onAddNotes)

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddNotes('')
    })

    // init prism properly
    Prism.highlightAll()
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory()
    }

    this.unmounted = true
    const { channel } = this.props
    channel.removeListener(
      'natterstefan/storybook-addon-data/init',
      this.onAddNotes,
    )
  }

  onAddNotes(options) {
    this.setState({
      text: options.parameters,
      data: options.data,
    })
  }

  highlightCode(data) {
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

  render() {
    const { data, text } = this.state
    const { active } = this.props

    if (!data || !active) {
      // do not render when tab is not active
      return null
    }

    const textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : ''
    let code = ''
    try {
      code = data.length && data.map(d => this.highlightCode(d))
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
}

// Register the addon with a unique name.
// https://storybook.js.org/addons/api/#addonapiregister
addons.register('natterstefan/storybook-addon-data', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('natterstefan/storybook-addon-data/panel', {
    title: 'Data',
    render: ({ active }) => (
      <Notes channel={addons.getChannel()} api={api} active={active} />
    ),
  })
})
