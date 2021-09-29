const { getActiveServerByEnvMode } = require("../../../utils/getActiveServer")

module.exports = (client, msg) => {
  let emojiIDs = [
    '768621842688638986', //MayTheCommunity
    '768622316648136714', //CodandoCommunity
    '823986197960851497', //may_the_community
    '823719899486617680' //codando
  ]

  msg.channel.id === getActiveServerByEnvMode().channels.avisos
    && msg.author !== client.user
    && client.emojis.cache
      .filter(emoji => emojiIDs.indexOf(emoji.id) > -1)
      .map(emoji => msg.react(emoji))
}