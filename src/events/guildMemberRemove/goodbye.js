module.exports = (client, activeServer, member) => {

  client.guilds.cache
    .find(server => server.id === member.guild.id)
      ?.channels.cache
        ?.find(channel => channel.id === activeServer.text_channel.mensagens_cody)
          ?.send(
            `O aluno *${member.user.username}#${member.user.discriminator}* saiu do server!`
          )

}