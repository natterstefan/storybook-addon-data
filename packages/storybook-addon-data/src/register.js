import React, { useEffect, useState } from 'react'
import { STORY_CHANGED } from '@storybook/core-events'
import addons from '@storybook/addons'

import Markdown from './components/markdown'
import CodeBlocks from './components/code-blocks'
import { ACTIONS, CONSTANTS } from './constants'

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
  }, [api])

  if (!data || !active) {
    // do not render when tab is not active
    return null
  }

  return (
    <div
      style={{
        margin: 10,
        overflow: 'auto',
      }}
    >
      <Markdown markdown={text} />
      <CodeBlocks data={data} />
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
