const Discord = require("discord.js");
const { getServer } = require("./getDiscordProperties");

/**
 * List emojis IDs of actual server
 * @param {Discord.Client} client
 */
module.exports = (client) =>
  client.on('ready', () => {
    getServer(client).channels.cache.map(channel =>
      console.log('"%s": "%s",', channel.name.toLowerCase(), channel.id)
    )
  });