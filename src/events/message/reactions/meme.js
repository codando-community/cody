module.exports = (client, activeServer) => client.on('message', msg => {
  msg.channel.id == activeServer.memes
    && msg.author !== client.user
    && msg.attachments.size
    && msg.react('😂')
})