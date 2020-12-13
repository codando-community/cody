module.exports = (client, activeServer, msg) => {
  msg.channel.id == activeServer.memes
    && msg.author !== client.user
    && msg.attachments.size
    && msg.react('😂')
}