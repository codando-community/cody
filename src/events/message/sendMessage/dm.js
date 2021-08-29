const store = require('store')
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

/**
 * Watson Assistant instance
 */
const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY,
  }),
  disableSslVerification: true,
  url: process.env.ASSISTANT_URL
});

/**
 *
 * @param {object} client
 * @param {object} activeServer
 * @param {object} msg
 */
function forward(client, activeServer, msg) {
  store.get(msg.author.id)
    ? messageFlow(msg, client, activeServer)
    : createSession(msg, client, activeServer)
}

/**
 *
 * @param {object} client
 * @param {object} msg
 * @param {string} roleName
 * @param {object} activeServer
 */
const addRole = (client, msg, outputText, activeServer) => {
  const GUILD = client.guilds.cache.find(g => g.id === activeServer.server_id)
  const roleName = outputText.split('aplicar cargo: ')[1]

  let cargoRecebido = GUILD.roles.cache.find(role => role.name.includes(roleName))
  let cargoMembro = GUILD.roles.cache.find(role => role.name.includes('membro'))
  let member = GUILD.members.cache.find(m => m.id === msg.author.id)

  cargoMembro &&
    member.roles.add(cargoMembro)
      .then(msg.reply(':blush: Acabei de liberar o seu acesso!! '))
      .catch(err => console.error(err)) // TODO redirect de erros pra uma function que envia no Discord em Cody/erros

  cargoRecebido &&
    member.roles.add(cargoRecebido)
      .then(msg.reply(`Acesso concedido: ${roleName}`))
      .catch(err => console.error(err))  // TODO redirect de erros pra uma function que envia no Discord em Cody/erros

  msg.reply('may the Community be with you! :vulcan:')
}

/**
 *
 * @param {object} client
 * @param {object} msg
 * @param {object} activeServer
 */
function discordID(client, msg, activeServer) {
  assistant.message({
    assistantId: process.env.ASSISTANT_ID_DM,
    sessionId: store.get(msg.author.id).session_id,
    input: {
      message_type: 'text',
      text: msg.author.id
    }
  })
    .then(response => {
      let output = response.result.output.generic[0]

      if (output && output.text.includes('aplicar cargo:')) {
        addRole(client, msg, output.text, activeServer)
      }
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param {object} msg
 * @param {object} client
 * @param {object} activeServer
 */
function messageFlow(msg, client, activeServer) {

  assistant.message({
    assistantId: process.env.ASSISTANT_ID_DM,
    sessionId: store.get(msg.author.id).session_id,
    input: {
      message_type: 'text',
      text: msg.content
    }
  })
    .then(response => {
      let output = response.result.output.generic[0]

      if (output) {
        if (output.text.includes('discord_id')) {
          discordID(client, msg, activeServer)

        } else if (output.text.includes('aplicar cargo:')) {
          addRole(client, msg, output.text, activeServer)

        } else {
          msg.reply(output.text)
        }
      }
    })
    .catch(err => {
      console.error('messageFlow error: ', err);

      err.body
      && err.body.toLowerCase().includes('invalid session')
      && createSession(msg, client, activeServer);
    });
}

/**
 *
 * @param {object} msg
 * @param {object} client
 * @param {object} activeServer
 */
function createSession(msg, client, activeServer) {
  assistant.createSession({
    assistantId: process.env.ASSISTANT_ID_DM,
  })
    .then(response => {
      store.set(msg.author.id, {
        discord_id: msg.author.id,
        session_id: response.result.session_id
      })
      messageFlow(msg, client, activeServer)
    })
    .catch(err => {
      console.error('error: ', err);
    });
}

module.exports = forward;