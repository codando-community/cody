module.exports = (client, activeServer) => client.on('message', msg => {
  if (msg.author !== client.user) {
    if (channel.type === 'dm') {

      const Action = require('./sendMessage/forward')
      Action(client, activeServer, msg)

    } else if (channel.id === avisos_id || channel.id === memes_id) {

      const Reaction = channel.id === avisos
        ? require('./reactions/avisos')
        : require('./reactions/meme')
      Reaction(client, activeServer, msg)

    } else if (msg.channel.id === activeServer.text_channel.cody_bash && msg.content.indexOf('--')) {

      switch (msg.content.toLowerCase().split(' ')[0]) {
        case 'role':
          let Path = require('./role/RoleManager')
          Path(client, activeServer, msg)
          break;

        case 'read':
          let Path = require('./sendMessage/read')
          Path(msg)
          break;

        case 'send' :
          let Path = require('./sendMessage/userAndRoles')
          Path(client, msg)
          break;

        case 'voice':
          let Path = require('./Audio')
          Path(client, activeServer, msg)
          break;
      }

    }
  }
});