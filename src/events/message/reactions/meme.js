module.exports = (client, activeServer, msg) => {
  msg.channel.id == activeServer.text_channel.memes
    && msg.author !== client.user
    && msg.attachments.size
    && msg.react('😂')
}