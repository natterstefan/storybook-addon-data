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
  width: '100%',
  overflow: 'auto',
})

const PreBlock = styled.pre({
  margin: '20px !important', // overwrite prims.js styling
})

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      data: {},
    }

    this.onAddNotes = this.onAddNotes.bind(this)
  }

  componentDidMount() {
    const { channel, api } = this.props
    // Listen to the notes and render it.
    channel.on('MYADDON/add_notes', this.onAddNotes)

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddNotes('')
    })
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory()
    }

    this.unmounted = true
    const { channel } = this.props
    channel.removeListener('MYADDON/add_notes', this.onAddNotes)
  }

  onAddNotes(options) {
    this.setState({ text: options.parameters, data: options.data })
  }

  render() {
    const { data, text } = this.state
    const { active } = this.props
    const textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : ''
    let code = ''

    try {
      code = Prism.highlight(JSON.stringify(data), Prism.languages.javascript)
    } catch (error) {
      // do nothing right now, just report
      console.error(error)
    }

    return active ? (
      <Fragment>
        <NotesPanel dangerouslySetInnerHTML={{ __html: textAfterFormatted }} />
        {code && (
          <PreBlock className="language-json">
            <code dangerouslySetInnerHTML={{ __html: code }} />
          </PreBlock>
        )}
      </Fragment>
    ) : null
  }
}

// Register the addon with a unique name.
addons.register('MYADDON', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('MYADDON/panel', {
    title: 'Notes',
    render: ({ active }) => (
      <Notes channel={addons.getChannel()} api={api} active={active} />
    ),
  })
})
