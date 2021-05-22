module.exports = (client, activeServer) => client.on('message', msg => {
  if (msg.author !== client.user) {

    if (msg.channel.type === 'dm') {
      const DM = require('./sendMessage/dm')
      DM(client, activeServer, msg)

    } else if (msg.channel.id === activeServer.text_channel.avisos) {
      const Avisos = require('./reactions/avisos')
      Avisos(client, activeServer, msg)

    } else if (msg.channel.id === activeServer.text_channel.memes) {
      const Memes = require('./reactions/meme')
      Memes(client, activeServer, msg)

    } else if (msg.channel.id === activeServer.text_channel.cody_bash &&
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

        // desabilitado devido a não ter necessidade de autenticar manualmente e se for o caso, ter que refatorar o código devido a alterações de BD
        // case 'auth':
        //   ManualAuth = require('./manualAuth')
        //   ManualAuth(client, activeServer, msg)
        //   break;

        default:
          msg.reply("opção inválida")
      }

    }
  }
});