const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
module.exports = (client, msg) => {
  msg.channel.id == configFile[process.env.ENV_MODE].channels.avisos
    && msg.author !== client.user
    && msg.attachments.size
    && msg.react('😂')
}