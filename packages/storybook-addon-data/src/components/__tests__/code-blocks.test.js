import React from 'react'
import { shallow } from 'enzyme'

import CodeBlocks from '../code-blocks'

describe('components/codeblocks', () => {
  const data = [
    {
      type: 'json',
      data: { test: 1 },
    },
    {
      type: 'json',
      data: { test: 2 },
    },
    {
      // invalid example
      type: 'json',
    },
  ]

  it('renders null when data is not present', () => {
    const wrapper = shallow(<CodeBlocks data={null} />)
    expect(wrapper.html()).toBeNull()
  })

  it('renders null when no data object contains proper code', () => {
    const wrapper = shallow(<CodeBlocks data={[{}]} />)
    expect(wrapper.html()).toBeNull()
  })

  it('renders a CodeBlock component or each valid data object', () => {
    const wrapper = shallow(<CodeBlocks data={data} />)
    expect(wrapper.find('CodeBlock')).toHaveLength(2)
  })

  it('renders no Markdown component when the object contains no notes property', () => {
    const wrapper = shallow(<CodeBlocks data={data} />)
    expect(wrapper.find('Markdown')).toHaveLength(0)
  })

  it('renders markdown notes before the CodeBlock when notes are present', () => {
    const objWithNotes = {
      type: 'json',
      data: { test: 1 },
      notes: '# Headline', // determines if Markdown is rendered or not
    }

    const wrapper = shallow(<CodeBlocks data={[objWithNotes, ...data]} />)
    expect(wrapper.find('CodeBlock')).toHaveLength(3)
    expect(wrapper.find('Markdown')).toHaveLength(1)
  })
})
