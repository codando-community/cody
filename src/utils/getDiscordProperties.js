const Discord = require("discord.js");
const configJson = require('../config.json');

/**
 * Get server object using ENV_MODE of .env variable and server id of config.json
 * @param {Discord.Client} client
 * @returns {Discord.Guild} Discord guild object
 */
function getServer(client) {
  let id = process.env.ENV_MODE === "prod"
    ? configJson.prod.server_id
    : configJson.dev.server_id

  return client.guilds.cache.find(server => server.id === id)
}

/**
 * Get channel object by channel ID
 * @param {Discord.Client} client
 * @param {String} channelID
 * @returns {Discord.TextChannel}
 */
function getChannelByID(client, channelID) {

  return getServer(client).channels.cache
    .find(channel => channel.id === channelID)
}

/**
 * @returns JSON server object of config.json
 */
function getLocalServerInfo() {
  return process.env.ENV_MODE === "prod"
    ? configJson.prod
    : configJson.dev
}

module.exports = {
  getServer,
  getChannelByID,
  getLocalServerInfo
};
