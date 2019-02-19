import React, { Fragment } from 'react'
import addons from '@storybook/addons'
import styled from 'styled-components'

const NotesPanel = styled.div({
  margin: 10,
  width: '100%',
  overflow: 'auto',
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

    return active ? (
      <Fragment>
        <NotesPanel dangerouslySetInnerHTML={{ __html: textAfterFormatted }} />
        <NotesPanel
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
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
