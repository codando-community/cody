module.exports = (client, activeServer, member) => {
  const message = `:face_with_symbols_over_mouth: *${member.user.username}#${member.user.discriminator}* saiu do server!`

  const currentServer = client.guilds.cache
    .find(server => server.id === member.guild.id)

  if (currentServer) {
    const codyInboxChannel = currentServer
      .channels.cache
      .find(channel => channel.id === activeServer.text_channel.mensagens_cody)

    codyInboxChannel
      && codyInboxChannel.send(message)
  }
}