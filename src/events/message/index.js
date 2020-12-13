module.exports = (client, activeServer) => client.on('message', msg => {
  if (msg.author !== client.user) {
    if (channel.type === 'dm') {

      const Action = require('./sendMessage/forward')
      Action(client, activeServer)

    } else if (channel.id === avisos_id || channel.id === memes_id) {

      const Reaction = channel.id === avisos
        ? require('./reactions/avisos')
        : require('./reactions/meme')
      Reaction(client, activeServer)

    } else if (msg.channel.id === activeServer.text_channel.cody_bash) {
      switch (msg.content.toLowerCase().split(' ')[0]) {
        case "":

          break;

        default:
          break;
      }
    } else {
      //console.log('problema seu troxa')
    }
  }
});