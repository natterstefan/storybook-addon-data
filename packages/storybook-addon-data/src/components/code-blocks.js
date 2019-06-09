import React, { Fragment } from 'react'

import highlightCode from '../services/highlight'

import Markdown from './markdown'
import CodeBlock from './code-block'

const CodeBlocks = ({ data }) => {
  if (!data) {
    return null
  }

  let code = ''
  try {
    code = data.length && data.map(d => highlightCode(d))
  } catch (error) {
    // do nothing right now, just report
    console.error(error) // eslint-disable-line
  }

  if (!code) {
    return null
  }

  return code.map((c, idx) => (
    <Fragment key={data[idx].name}>
      <Markdown markdown={data[idx].notes} />
      <CodeBlock name={data[idx].name} code={c} type={data[idx].type} />
      <br />
    </Fragment>
  ))
}

export default CodeBlocks
