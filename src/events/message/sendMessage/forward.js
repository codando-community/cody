module.exports = (client, activeServer, msg, channelID) => {
  console.log('channelID: ', channelID)
  const channel = client.guilds.cache
    .find(g => g.id === activeServer.server_id).channels.cache
    .find(ch => ch.id == channelID)

  console.log('channel: ', channel)

  if (channelID === activeServer.text_channel.auth) {
    channel.send(
      "O User: "
      + msg.channel.recipient.username + "#"
      + msg.channel.recipient.discriminator
      + " gostaria de esclarecer algumas duvidas antes de ser autenticado")
  } else {
    channel.send(
      "** Mensagem enviada por **: "
      + msg.channel.recipient.username + "#"
      + msg.channel.recipient.discriminator
      + "\n ** Conteúdo: **"
      + msg.content)
  }
}