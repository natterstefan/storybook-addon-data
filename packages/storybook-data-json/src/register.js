/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import addons from '@storybook/addons'
import styled from 'styled-components'

// inspired by
// - https://github.com/storybooks/addon-jsx/blob/1a95e61290cd2f68bc2909c5bc8f7adc79345097/src/jsx.js
// - https://codepen.io/eksch/pen/jukqf?editors=1010
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
      story: {},
      text: '',
    }

    this.onAddNotes = this.onAddNotes.bind(this)
  }

  componentDidMount() {
    const { channel, api } = this.props
    // Listen to the notes and render it.
    channel.on('natterstefan/storybook-data-json/init', this.onAddNotes)

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
      'natterstefan/storybook-data-json/init',
      this.onAddNotes,
    )
  }

  onAddNotes(options) {
    this.setState({
      text: options.parameters,
      data: options.data,
      story: options.story,
    })
  }

  render() {
    // eslint-disable-next-line
    const { data, story, text } = this.state
    const { active } = this.props
    if (!data || !active) {
      return null
    }

    const textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : ''
    let code = ''

    if (data.data) {
      try {
        code = Prism.highlight(
          JSON.stringify(data.data, null, 2),
          Prism.languages[data.type],
        )
      } catch (error) {
        // do nothing right now, just report
        console.error(error) // eslint-disable-line
      }
    }

    return (
      <NotesPanel>
        {textAfterFormatted && (
          <Fragment>
            <h2>Notes</h2>
            <div dangerouslySetInnerHTML={{ __html: textAfterFormatted }} />
          </Fragment>
        )}
        {code && (
          <Fragment>
            <h2>{data.name}</h2>
            <pre className={`language-${data.type} line-numbers`}>
              <code dangerouslySetInnerHTML={{ __html: code }} />
              {}
            </pre>
          </Fragment>
        )}
      </NotesPanel>
    )
  }
}

// Register the addon with a unique name.
addons.register('natterstefan/storybook-data-json', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('natterstefan/storybook-data-json/panel', {
    title: 'Data',
    render: ({ active }) => (
      <Notes channel={addons.getChannel()} api={api} active={active} />
    ),
  })
})
