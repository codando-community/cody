const store = require('store')
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const addRole = (client, msg, idMember, roleName, activeServer) => {
  const GUILD = client.guilds.cache.find(g => g.id === activeServer.server_id)

  let cargoRecebido = GUILD.roles.cache.find(role => role.name.indexOf(roleName) !== -1)
  let cargoMembro = GUILD.roles.cache.find(role => role.name.indexOf('membro') !== -1)
  let member = GUILD.members.cache.find(m => m.id === idMember)

  cargoMembro &&
    member.roles.add(cargoMembro)
      .then(msg.reply(':blush: Acabei de liberar o seu acesso!! '))
      .catch(console.error)

  cargoRecebido &&
    member.roles.add(cargoRecebido)
      .then(msg.reply('Que a força da comunidade esteja com você!'))
      .catch(console.error)
}

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: 'VYVVtGoRGynFLa-L0qicba9fKoDSOEKJrz6ms_dhmjRu',
  }),
  disableSslVerification: true,
  url: 'https://gateway.watsonplatform.net/assistant/api',
});

function messageFlow(msg, client, activeServer) {
  assistant.message({
    assistantId: 'd0f3d408-0f3c-4621-9f7f-b4f536096326',
    sessionId: store.get(msg.author.id).session_id,
    input: {
      message_type: 'text',
      text: msg.content
    }
  })
    .then(res => {
      if (res.result.output.generic[0] && res.result.output.generic[0].text.indexOf('discord_id') !== -1) {
        assistant.message({
          assistantId: 'd0f3d408-0f3c-4621-9f7f-b4f536096326',
          sessionId: store.get(msg.author.id).session_id,
          input: {
            message_type: 'text',
            text: msg.author.id
          }
        })
          .then(res => {
            if (res.result.output.generic[0] && res.result.output.generic[0].text.indexOf('aplicar cargo:') !== -1) {
              addRole(client, msg, msg.author.id, res.result.output.generic[0].text.split('aplicar cargo: ')[1], activeServer)
            }
          })
          .catch(err => console.error(err))

      } else if (res.result.output.generic[0] && res.result.output.generic[0].text.indexOf('aplicar cargo:') !== -1) {
        addRole(client, msg, msg.author.id, res.result.output.generic[0].text.split('aplicar cargo: ')[1], activeServer)

      } else {
        msg.reply(res.result.output.generic[0].text)
      }
    })
    .catch(err => console.error('messageFlow error: ', err));
}

function createSession(msg, client, activeServer) {
  assistant.createSession({
    assistantId: 'd0f3d408-0f3c-4621-9f7f-b4f536096326',
  })
    .then(res => {
      store.set(msg.author.id, {
        discord_id: msg.author.id,
        session_id: res.result.session_id
      })
      messageFlow(msg, client, activeServer)
    })
    .catch(err => {
      console.error('error: ', err);
    });
}

module.exports = (client, activeServer, msg) => {
  store.get(msg.author.id)
    ? messageFlow(msg, client, activeServer)
    : createSession(msg, client, activeServer)
}