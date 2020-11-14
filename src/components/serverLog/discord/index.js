module.exports = client => client.on('message', msg => {

  const isDiretoriaMember = msg => {

    let result = false

    client.guilds.cache
    .filter(server => server.id === process.env.SERVER_ID)
    .map(server => {
      server.roles.cache
      .filter(role => role.name.toLowerCase() === 'diretoria')
      .map(diretoria => roleId = diretoria.id)

      server.members.cache
      .map(member =>
        member.user.username.toLowerCase() === msg.channel.recipient.username.toLowerCase()
        && member.user.discriminator === msg.channel.recipient.discriminator
        && (result=true)
        )
    })

    return result
  }

  if (msg.channel.type == 'dm') {
    if (msg.author !== client.user) {
      if (msg.content.toLowerCase().indexOf('server status') != -1 && isDiretoriaMember(msg)) {
        client.guilds.cache.map(c => c.roles.cache.map(role =>
          msg.reply(`cargo: ${role.name}, members: ${role.members.size}`)))
      }
    }
  }
})