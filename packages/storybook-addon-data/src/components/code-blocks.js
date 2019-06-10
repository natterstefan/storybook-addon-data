import React, { Fragment } from 'react'

import prepareData from '../services/prepare-data'

import Markdown from './markdown'
import CodeBlock from './code-block'

const CodeBlocks = ({ data }) => {
  if (!data) {
    return null
  }

  let code = ''
  try {
    code = data.length && data.map(d => prepareData(d))
  } catch (error) {
    // do nothing right now, just report
    console.error(error) // eslint-disable-line
  }

  if (!code) {
    return null
  }

  return code.map(
    (codeContent, idx) =>
      codeContent && (
        <Fragment key={data[idx].name}>
          {data[idx].notes && <Markdown markdown={data[idx].notes} />}
          <CodeBlock
            name={data[idx].name}
            code={codeContent}
            type={data[idx].type}
          />
          <br />
        </Fragment>
      ),
  )
}

export default CodeBlocks
