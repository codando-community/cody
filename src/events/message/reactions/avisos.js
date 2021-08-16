const { getActiveServerByEnvMode } = require("../../../utils/getActiveServer")

module.exports = (client, msg) => {
  let emojiIDs = [
    '768621446392971277', //LogoCodando
    '768621842688638986', //MayTheCommunity
    '768623311323529216', //VivaUmBugDeCadaVez
    '768622316648136714', //CodandoCommunity
  ]

  msg.channel.id === getActiveServerByEnvMode().channels.avisos
    && msg.author !== client.user
    && client.emojis.cache
      .filter(emoji => emojiIDs.indexOf(emoji.id) > -1)
      .map(emoji => msg.react(emoji))
}