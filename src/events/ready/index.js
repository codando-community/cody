const Discord = require('discord.js');
const config = require('../../config.json');

/**
 * Bot initialization
 * @param {Discord.Client} client
 * @param {Object} activeServer
 */
module.exports = (client, activeServer) => client.on('ready', () => {
  client.user.setActivity('instagram/codando.community', { type: 'WATCHING' })

  config.prod.server_id === activeServer.server_id
    ? console.log('Em ambiente de produção!')
    : console.log('Em ambiente de desenvolvimento.');
});