module.exports = (client, activeServer) => client.on('message', msg => {

  if (msg.author !== client.user) {
    if (msg.channel.type === 'dm') {
        const Action = require('./sendMessage/forward')
        Action(client, activeServer, msg, activeServer.text_channel.mensagens_cody)

    } else if (msg.channel.id === activeServer.text_channel.avisos || msg.channel.id === activeServer.text_channel.memes) {

      const Reaction = msg.channel.id === activeServer.text_channel.avisos
        ? require('./reactions/avisos')
        : require('./reactions/meme')
      Reaction(client, activeServer, msg)

    } else if (msg.channel.id === activeServer.text_channel.cody_bash && msg.content.indexOf('--')) {
      let Path
      switch (msg.content.toLowerCase().split(' ')[0]) {
        case 'role':
          Path = require('./role/RoleManager')
          Path(client, activeServer, msg)
          break;

        case 'read':
          Path = require('./sendMessage/read')
          Path(msg)
          break;

        case 'send':
          Path = require('./sendMessage/userAndRoles')
          Path(client, msg)
          break;

        case 'voice':
          Path = require('./audio')
          Path(client, activeServer, msg)
          break;

        case 'server':
          Path = require('./serverStatus/roleStatus')
          Path(client, activeServer, msg)
          break;

        case 'auth':
          Path = require('./auth')
          Path(client, activeServer, msg)
          break;
      }

    }
  }
});