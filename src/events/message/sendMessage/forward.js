const store = require('store')
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY_AUTENTICACAO,
  }),
  disableSslVerification: true,
  url: process.env.ASSISTANT_URL_AUTENTICACAO,
});

function messageFlow(msg) {
  assistant.message({
    assistantId: process.env.ASSISTANT_ID_AUTENTICACAO,
    sessionId: store.get(msg.author.id).session_id,
    input: {
      message_type: 'text',
      text: msg.content
    }
  })
    .then(res => {
      res.result
      msg.reply(res.result.output.generic[0].text)
    })
    .catch(err => {
      console.log('messageFlow error: ', err.body);

      if (err.body.toLowerCase().indexOf('ínvalid session') !== -1) {
        msg.reply('sessao invalida')
        createSession(msg)
      }
    });
}

function createSession(msg) {
  assistant.createSession({
    assistantId: process.env.ASSISTANT_ID_AUTENTICACAO,
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
    messageFlow(msg)

  } else {
    createSession(msg)

  }
}