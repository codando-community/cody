const Discord = require("discord.js");
const configFile = require("../../../config.json");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} msg
 */
module.exports = (client, msg) => {
  let emojiIDs = [
    '768621842688638986', //MayTheCommunity
    '768622316648136714', //CodandoCommunity
    '823986197960851497', //may_the_community
    '823719899486617680' //codando
  ]

  msg.channel.id === configFile[process.env.ENV_MODE].channels.avisos
    && msg.author !== client.user
    && client.emojis.cache
      .filter(emoji => emojiIDs.indexOf(emoji.id) > -1)
      .map(emoji => msg.react(emoji))
}