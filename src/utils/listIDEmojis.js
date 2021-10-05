const Discord = require("discord.js");
const { getServer } = require("./getDiscordProperties");

/**
 * List emojis IDs of actual server
 * @param {Discord.Client} client
 */
module.exports = (client) =>
  client.on('ready', () => {
    let server = getServer(client)
    console.log(server.emojis.cache)
  });