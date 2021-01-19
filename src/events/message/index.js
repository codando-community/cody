module.exports = (client, activeServer) => client.on('message', msg => {
  if (msg.author !== client.user) {
    if (msg.channel.type === 'dm') {
      // if (msg.content.toLowerCase().indexOf('autenticar ') !== -1) {
      //   const Action = require('./sendMessage/auth')
      //   Action(client, activeServer, msg)

      // } else if (msg.content.toLowerCase().indexOf('conversar com um organizador') !== -1) {
      //   const Action = require('./sendMessage/forward')
      //   Action(client, activeServer, msg, activeServer.text_channel.auth)

      // } else if (msg.content.toLowerCase().indexOf('sim, está correto ') !== -1) {
      //   const Action = require('./sendMessage/auth')
      //   Action(client, activeServer, msg)
      //   //Executar apenas depois da anterior o envio de uma mensagem no canal 'caixa-de-entrada' contendo o seguinte texto 'Aluno davibrandao18#9821 autenticado com sucesso!'

      // } else if (msg.content.toLowerCase().indexOf('não, há divergências') !== -1) {
      //   const Action = require('./sendMessage/forward')
      //   Action(client, activeServer, msg, activeServer.text_channel.auth)

      // } else {
      //   const Action = require('./sendMessage/forward')
      //   Action(client, activeServer, msg, activeServer.text_channel.mensagens_cody)
      // }

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