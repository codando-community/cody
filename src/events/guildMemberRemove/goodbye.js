const instance = require("../../database")

module.exports = (client, activeServer, member) => {
  const message = `O aluno *${member.user.username}#${member.user.discriminator}* saiu do server!`
  const errorMessage = `erro ao remover *${member.user.username}#${member.user.discriminator}* do banco de dados`

  const currentServer = client.guilds.cache
    .find(server => server.id === member.guild.id)

  if (currentServer) {
    const codyInboxChannel = currentServer
      .channels.cache
      .find(channel => channel.id === activeServer.text_channel.mensagens_cody)

    codyInboxChannel
      && codyInboxChannel.send(message)

    instance.select({ contact: { discord: `${member.user.username}#${member.user.discriminator}`}})
      .then(result => {
        data = result[0]
        data.active = false
        data.join_auth = false

        instance.updateDocument(data)
      })
      .catch(() => codyInboxChannel.send(errorMessage))
  }
}