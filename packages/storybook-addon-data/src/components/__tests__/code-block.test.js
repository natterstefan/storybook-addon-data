import React from 'react'
import { shallow } from 'enzyme'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

import CodeBlock from '../code-block'

describe('components/codeblock', () => {
  it('renders null when code is not present', () => {
    const wrapper = shallow(<CodeBlock code={null} type="something" />)
    expect(wrapper.html()).toBeNull()
  })

  it('renders null when type is not present', () => {
    const wrapper = shallow(<CodeBlock code="something" type={null} />)
    expect(wrapper.html()).toBeNull()
  })

  it('renders SyntaxHighlighter with the given type and code', () => {
    const wrapper = shallow(
      <CodeBlock code="console.log('test')" type={'js'} />,
    )
    expect(wrapper.find('SyntaxHighlighter')).toHaveLength(1)
  })

  it('renders the optional property name as headline', () => {
    const wrapper = shallow(
      <CodeBlock code="console.log('test')" type={'js'} name="some headline" />,
    )
    expect(wrapper.find('h3')).toHaveLength(1)
    expect(wrapper.find('h3').text()).toStrictEqual('some headline')
  })

  it('renders SyntaxHighlighter with the dracual style and line numbers', () => {
    const wrapper = shallow(
      <CodeBlock code="console.log('test')" type={'js'} />,
    )
    expect(wrapper.find('SyntaxHighlighter').props()).toMatchObject({
      style: darcula,
      showLineNumbers: true,
    })
  })
})
