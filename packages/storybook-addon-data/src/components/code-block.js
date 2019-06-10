/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// TODO: make configurable
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ code, name, type }) => {
  if (!code || !type) {
    return null
  }

  return (
    <Fragment>
      {name && <h3>{name}</h3>}
      <SyntaxHighlighter language={type} style={darcula} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </Fragment>
  )
}

export default CodeBlock
