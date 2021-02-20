const store = require('store')
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const apiKey = 'VYVVtGoRGynFLa-L0qicba9fKoDSOEKJrz6ms_dhmjRu'
const url = 'https://gateway.watsonplatform.net/assistant/api'
const assistantID = 'd0f3d408-0f3c-4621-9f7f-b4f536096326'

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: apiKey,
  }),
  disableSslVerification: true,
  url: url,
});

const messageFlow = (msg) => {
  assistant.message({
    assistantId: assistantID,
    sessionId: store.get('local_session').session_id,
    input: {
      message_type: 'text',
      text: msg.content
    }
  })
  .then(res => {
    msg.reply(res.result.output.generic[0].text)
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports = (client, activeServer, msg, channelID) => {
  if (store.get('local_session') && msg.author.id === store.get('local_session').discord_id) {
    messageFlow(msg)
  } else {
    assistant.createSession({
      assistantId: assistantID
    })
    .then(res => {
      store.set('local_session', {
        discord_id: msg.author.id,
        session_id:res.result.session_id
      })
      messageFlow(msg)
    })
    .catch(err => {
      console.error('error: ', err);
    });
  }
}