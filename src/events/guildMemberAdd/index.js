const Welcome = require("./welcome");
const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
  client.on('guildMemberAdd', member => {
    Welcome(member)
  })
}