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
      addons.getChannel().emit(ACTIONS.init, {
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
 *  withDataWrapper(
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
 * @TODO: allow data to be a function, creating the data object dynamically
 */
const withDataWrapper = (data, Story) => ({
  kind,
  parameters: { notes },
  story,
}) => {
  // init the panel
  addons.getChannel().emit(ACTIONS.init, {
    kind,
    parameters: notes,
    data,
    story,
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

export { withData, withDataWrapper }
export default withData
