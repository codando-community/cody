const axios = require("axios")
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV1({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: 'VYVVtGoRGynFLa-L0qicba9fKoDSOEKJrz6ms_dhmjRu',
  }),
  disableSslVerification: true,
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/1bfbda5a-a70b-4361-be08-5587bd6dc71c/v2/assistants/d0f3d408-0f3c-4621-9f7f-b4f536096326/sessions',
});


module.exports = (client, activeServer, msg, channelID) => {
  assistant.message({
    workspaceId: '10001',
    input: {'text': 'Autenticar'}
  })
  .then(res => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch(err => {
    console.log(err)
  });
}