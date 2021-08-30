const Discord = require('discord.js');

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
const handleRole = (client, msg, outputText, activeServer, isAddRole) => {
  const GUILD = client.guilds.cache.find(g => g.id === activeServer.server_id)
  const ROLENAME = isAddRole
                    ? outputText.split('aplicar cargo: ')[1]
                    : outputText.split('remover cargo: ')[1]

  let cargoRecebidoWatson = GUILD.roles.cache.find(role => role.name.includes(ROLENAME))
  let cargoMembro = GUILD.roles.cache.find(role => role.name.includes('membro'))
  let member = GUILD.members.cache.find(m => m.id === msg.author.id)
  let guildMemberRoleManager = new Discord.GuildMemberRoleManager(member)

  if (isAddRole) {
    cargoMembro && guildMemberRoleManager.add(cargoMembro)
    .then(guildMember => guildMember.send(':blush: Acabei de liberar o seu acesso!!'))
    .catch(error => console.error(error))

    cargoRecebidoWatson && guildMemberRoleManager.add(cargoRecebidoWatson)
    .then(guildMember => guildMember.send(':partying_face: Acesso concedido!!'))
    .catch(error => console.error(error))

  } else {
    cargoRecebidoWatson &&
      new Discord.GuildMemberRoleManager(member).remove(cargoRecebidoWatson)
      .then(guildMember => guildMember.send(`:wink: Prontinho, removi ${ROLENAME} pra vc!`))
      .catch(error => console.error(error))
  }

  member.send('may the Community be with you! :vulcan:')
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
        handleRole(client, msg, output.text, activeServer, true)
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

      if (output && output.text) {
        if (output.text.includes('discord_id')) {
          discordID(client, msg, activeServer)

        } else if (output.text.includes('aplicar cargo:')) {
          handleRole(client, msg, output.text, activeServer, true)

        } else if (output.text.includes('remover cargo:')) {
          handleRole(client, msg, output.text, activeServer, false)
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