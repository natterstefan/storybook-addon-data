/* eslint-disable react/no-danger */
import React from 'react'
import marked from 'marked'

const Markdown = ({ markdown }) => {
  if (!markdown) {
    return null
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      style={{ marginTop: 15, marginBottom: 15 }}
    />
  )
}

export default Markdown
