import addons, { makeDecorator } from '@storybook/addons'

// docs: https://storybook.js.org/addons/api/#makedecorator-api
const withDataJson = data =>
  makeDecorator({
    name: 'withDataJson',
    parameterName: 'notes',
    // This means don't run this decorator if the notes decorator is not set
    skipIfNoParametersOrOptions: true,
    // NOTE: getStory() contains the currently rendered node-tree (and it's props)
    wrapper: (getStory, context, { parameters }) => {
      // Our simple API above simply sets the notes parameter to a string,
      // which we send to the channels
      const channel = addons.getChannel()
      channel.emit('natterstefan/storybook-data-json/init', {
        parameters,
        data,
        story: getStory(),
      })

      return getStory(context)
    },
  })

export default withDataJson
