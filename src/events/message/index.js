const { getActiveServerByEnvMode } = require('../../utils/getActiveServer');

const activeServer = getActiveServerByEnvMode();

module.exports = (client) => client.on('message', msg => {
  if (msg.author !== client.user) {
    console.log(activeServer.channels.avisos, msg.channel.id, msg.channel.name)
    if (msg.channel.type === 'dm') {
      const DM = require('./sendMessage/dm')
      // DM(client, msg)

    } else if (msg.channel.id === activeServer.channels.avisos) {
      console.log("avisos")
      const Avisos = require('./reactions/avisos')
      Avisos(client, msg)

    } else if (msg.channel.id === activeServer) {
      const Memes = require('./reactions/meme')
      Memes(client, activeServer, msg)

    } else if (msg.channel.id === activeServer.channels['cody-bash'] &&
                      msg.content.includes('--')) {

      switch (msg.content.toLowerCase().split(' ')[0]) {
        case 'role':
          let RoleManager = require('./role/RoleManager')
          RoleManager(client, activeServer, msg)
          break;

        case 'read':
          let Read = require('./sendMessage/read')
          Read(msg)
          break;

        case 'send':
          let UserAndRoles = require('./sendMessage/userAndRoles')
          UserAndRoles(client, msg)
          break;

        case 'voice':
          let Voice = require('./audio')
          Voice(client, activeServer, msg)
          break;

        case 'server':
          let Server = require('./serverStatus/roleStatus')
          Server(client, activeServer, msg)
          break;

        default:
          msg.reply("opção inválida")
      }

    }
  }
});