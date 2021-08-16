const { getActiveServerByServerName, getActiveServerByEnvMode } = require("../../utils/getActiveServer");
const { updateConfigFile } = require("../../utils/updateConfigFile");

module.exports = (client) => client.on('ready', () => {

  updateConfigFile(client)
  .then(() => {
    getActiveServerByServerName("Codando").server_id === getActiveServerByEnvMode().server_id
      ? client.user.setActivity('flow.page/codando.community', { type: 'WATCHING' })
      && console.log('Em ambiente de produção!')

      : client.user.setActivity('instagram/codando.community', { type: 'WATCHING' })
      && console.log('Em ambiente de desenvolvimento.');
  })
  .catch(console.error)
});