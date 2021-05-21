const store = require('store')
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const addRole = (client, msg, idMember, roleName, activeServer) => {
  const guildsCache = client.guilds.cache.find(g => g.id === activeServer.server_id)

  let cargoInstituicao = guildsCache.roles.cache.find(role => role.name.indexOf(roleName) !== -1)
  let cargoMembro = guildsCache.roles.cache.find(role => role.name.indexOf('membro') !== -1)
  let member = guildsCache.members.cache.find(m => m.id === idMember)

  cargoMembro &&
    member.roles.add(cargoMembro)
    .then(
      msg.reply(':blush: Acabei de liberar o seu acesso!! 1')
    )
    .catch(console.error)

  cargoInstituicao &&
    member.roles.add(cargoInstituicao)
    .then(
      msg.reply('Bem vindx ao Codando!')
    )
    .catch(console.error)
}

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY,
  }),
  disableSslVerification: true,
  url: process.env.ASSISTANT_URL,
});

function messageFlow(msg, client, activeServer) {
  assistant.message({
    assistantId: process.env.ASSISTANT_ID_DM,
    sessionId: store.get(msg.author.id).session_id,
    input: {
      message_type: 'text',
      text: msg.content
    }
  })
    .then(res => {
      if (res.result.output.generic[0] && res.result.output.generic[0].text.indexOf('discord_id') !== -1) {
        assistant.message({
          assistantId: process.env.ASSISTANT_ID_DM,
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
    .catch(err => {
      console.error('messageFlow error: ', err);

      if (err.body && err.body.toLowerCase().indexOf('invalid session') !== -1) {
        msg.reply('sessao invalida')
        createSession(msg)
      }
    });
}

function createSession(msg) {
  assistant.createSession({
    assistantId: process.env.ASSISTANT_ID_DM,
  })
    .then(res => {
      store.set(msg.author.id, {
        discord_id: msg.author.id,
        session_id: res.result.session_id
      })
      messageFlow(msg)
    })
    .catch(err => {
      console.error('error: ', err);
    });
}

module.exports = (client, activeServer, msg, channelID) => {
  const local_session = store.get(msg.author.id)

  if (local_session) {
    messageFlow(msg, client, activeServer)

  } else {
    createSession(msg)

  }
}