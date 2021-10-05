const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => client.on('ready', () => {
  process.env.ENV_MODE === 'prod'
    ? client.user.setActivity('flow.page/codando.community', { type: 'WATCHING' })
    && console.log('Em ambiente de produção!')

    : client.user.setActivity('instagram/codando.community', { type: 'WATCHING' })
    && console.log('Em ambiente de desenvolvimento.');
});