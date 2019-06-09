import React from 'react'
// docs: https://storybook.js.org/addons/api/#makedecorator-api
import addons, { makeDecorator } from '@storybook/addons'

import { ACTIONS } from './constants'

/**
 * Example Usage
 *
 * ```js
 * storiesOf('Button', module)
 *  .addDecorator(
 *    withData([
 *      { name: 'data.json', type: 'json', data: dataJson },
 *      { name: 'data.js', type: 'javascript', data: dataJs },
 *      { name: 'data.gql', type: 'graphql', data: dataGql },
 *      { name: 'data.yaml', type: 'yaml', data: dataYaml },
 *    ]),
 *  )
 *  .add(
 *    'with text',
 *    () => <Button {...dataJson} onClick={action('clicked')} />,
 *    {
 *      notes: 'This is a very simple Button and you can click on it.',
 *    },
 *  )
 * ```
 */
const withData = data =>
  makeDecorator({
    name: 'withData',
    parameterName: 'notes',
    // This means still run this decorator if the notes decorator is not set
    skipIfNoParametersOrOptions: false,
    // NOTE: story() contains the currently rendered node-tree (and it's props)
    wrapper: (story, context, { parameters }) => {
      // Our simple API above simply sets the notes parameter to a string,
      // which we send to the channels
      const channel = addons.getChannel()
      channel.emit(ACTIONS.init, {
        parameters, // will contain value of "notes" parameter
        data,
        story,
      })

      /**
       * whatever we return here will be rendered in the Preview area of the
       * story
       *
       * links
       * - https://github.com/tuchk4/storybook-readme
       *  - https://nttr.st/2VbkAOO (story)
       *  - https://nttr.st/2VbkyGG (decorator registration)
       *  - https://nttr.st/2BNdAR1 (decorator logic)
       *
       * example
       * ```js
       * return <CustomWrapper>{story(context)}</CustomWrapper>
       * ```
       */

      return story(context)
    },
  })

/**
 * Example usage
 *
 * ```js
 * storiesOf('Button', module).add(
 *  'with withData HoC',
 *  withDataHOC(
 *    [
 *      { name: 'data.json', type: 'json', data: dataJson, prop: 'json' },
 *    ],
 *    props => <Button {...props.json} onClick={action('clicked')} />,
 *  ),
 *  {
 *    notes: 'This is a very simple Button and you can click on it.',
 *  },
 * )
 * ```
 *
 * TODO: allow data to be a function, creating the data object dynamically
 */
const withDataHOC = (data, Story) => storyParams => {
  // get notes from story paramaters
  const { notes } = (storyParams && storyParams.parameters) || {}

  // init the panel
  const channel = addons.getChannel()
  channel.emit(ACTIONS.init, {
    parameters: notes,
    data,
  })

  // we put every data input into a prop off the Story
  const props = {}
  if (data && data.length) {
    data.forEach(prop => {
      if (prop.prop) {
        props[prop.prop] = prop.data
      }
    })
  }

  // and render the story in the storybook preview
  return <Story {...props} />
}

const withDataWrapper = (...args) => {
  /**
   * TODO: remove in later version
   * @deprecated
   *
   * save a flag on the window obj, so this warning is only printed once in the
   * storybook app
   */
  /* eslint-disable no-underscore-dangle */
  window._withDataWrapper = window._withDataWrapper || false
  if (!window._withDataWrapper) {
    window._withDataWrapper = true
    // eslint-disable-next-line
    console.warn(
      '[Deprecation]',
      'withDataWrapper is deprecated, got a new name and will be removed in the future.',
      'Please, use withDataHOC (with the same arguments) instead.',
    )
  }
  /* eslint-enable no-underscore-dangle */

  return withDataHOC(...args)
}

export { withData, withDataWrapper, withDataHOC }
export default withData
