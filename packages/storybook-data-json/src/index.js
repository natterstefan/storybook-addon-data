import addons, { makeDecorator } from '@storybook/addons'

const withNotes = data =>
  makeDecorator({
    name: 'withNotes',
    parameterName: 'notes',
    // This means don't run this decorator if the notes decorator is not set
    skipIfNoParametersOrOptions: true,
    // NOTE: getStory() contains the currently rendered node-tree
    wrapper: (getStory, context, { parameters }) => {
      // Our simple API above simply sets the notes parameter to a string,
      // which we send to the channels
      const channel = addons.getChannel()
      channel.emit('MYADDON/add_notes', { parameters, data })

      return getStory(context)
    },
  })

export default withNotes
