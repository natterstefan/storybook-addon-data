// docs: https://storybook.js.org/addons/api/#makedecorator-api
import addons, { makeDecorator } from '@storybook/addons'

const withDataJson = data =>
  makeDecorator({
    name: 'withDataJson',
    parameterName: 'notes',
    // This means still run this decorator if the notes decorator is not set
    skipIfNoParametersOrOptions: false,
    // NOTE: story() contains the currently rendered node-tree (and it's props)
    wrapper: (story, context, { parameters }) => {
      // Our simple API above simply sets the notes parameter to a string,
      // which we send to the channels
      const channel = addons.getChannel()
      channel.emit('natterstefan/storybook-data-json/init', {
        parameters,
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

export default withDataJson
