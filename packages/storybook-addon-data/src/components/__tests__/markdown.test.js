import React from 'react'
import { shallow } from 'enzyme'

import Markdown from '../markdown'

describe('components/markdown', () => {
  it('renders null when markdown is not present', () => {
    const wrapper = shallow(<Markdown markdown={null} />)
    expect(wrapper.html()).toBeNull()
  })

  it('renders markdown', () => {
    const wrapper = shallow(<Markdown markdown="# Some Headline" />)
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div style=\\"margin-top:15px;margin-bottom:15px\\"><h1 id=\\"some-headline\\">Some Headline</h1>
      </div>"
    `)
  })
})
