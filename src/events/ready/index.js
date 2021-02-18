const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
module.exports = (client, activeServer, config) => client.on('ready', () => {
  config.prod.server_id === activeServer.server_id
    ? client.user.setActivity('flow.page/codando.community', { type: 'WATCHING' })
    && console.log('Em ambiente de produção!')

    : client.user.setActivity('instagram/codando.community', { type: 'WATCHING' })
    && console.log('Em ambiente de desenvolvimento.');

  const assistant = new AssistantV1({
    version: '2020-04-01',
    authenticator: new IamAuthenticator({
      apikey: 'VYVVtGoRGynFLa-L0qicba9fKoDSOEKJrz6ms_dhmjRu',
    }),
    disableSslVerification: true,
    url: 'https://gateway.watsonplatform.net/assistant/api',
  });

  assistant.message({
    workspaceId: 'b268df3a-bc67-4476-8656-079245d6bf5f',
    input: { 'text': 'Autenticar' },
    context: {}
  })
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.log(err)
    });
});





// const assistant = new AssistantV1({
//   version: '2020-04-01',
//   authenticator: new IamAuthenticator({
//     apikey: 'VYVVtGoRGynFLa-L0qicba9fKoDSOEKJrz6ms_dhmjRu',
//   }),
//   disableSslVerification: true,
//   url: 'https://gateway.watsonplatform.net/assistant/api',
// });

// app.use(cors())
// app.use(bodyParser.json());
// app.use(express.static('./public'));

// const port = 3000;

// try {
//   console.log('try')
//   app.post('/conversation/', (req, res) => {
//     const { text, context = {} } = req.body;

//     const params = {
//       input: 'Autenticar',
//       workspace_id: 'b268df3a-bc67-4476-8656-079245d6bf5f',
//       context,
//     };

//     assistant.message(params, (err, response) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json(err);
//       } else {
//         res.json(response);
//       }
//     });
//   });
// } catch (error) {
//   console.log('error:', error)
// }


// app.listen(port, () => console.log(`Running on port ${port}`));