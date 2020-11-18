module.exports = client => client.on('message', msg => {
  const isCodyReference = msg.mentions.users.filter(u => u === client.user).size === 1

  const isDiretoriaMember = msg => {

    let result = false

    client.guilds.cache
    .filter(server => server.id === process.env.SERVER_ID)
    .map(server => {
      server.roles.cache
      .filter(role => role.name.toLowerCase() === 'diretoria')
      .map(diretoria => roleId = diretoria.id)

console.log(msg)

      server.members.cache
      .map(member =>
        member.user.username.toLowerCase() === msg.author.username.toLowerCase()
        && member.user.discriminator === msg.author.discriminator
        && (result=true)
        )
    })

    return result
  }

  if (msg.channel.id === process.env.CHANNEL_CODYBASH_ID)
    if (msg.author !== client.user)
      if (msg.content.toLowerCase().indexOf('enviar para') != -1)
        if (msg.content.toLowerCase().indexOf('mensagem:') != -1) {
          if (!isCodyReference) {
            if (isDiretoriaMember(msg)) {
              console.log('a')
              if (msg.mentions.users.size > 0) {
                msg.mentions.users.map(u =>
                  u.send(msg.content.split('mensagem:')[1])
                  && msg.reply('enviado!')
                )
              } else if (msg.mentions.roles.size > 0) {
                msg.mentions.roles.map(r =>
                  r.members.map(u =>
                    u.user !== client.user && u.user.send(msg.content.split('mensagem:')[1])
                  )
                )
              }
            }
          } else {
            msg.reply('Você ta fazendo besteira')
          }
        } else {
          msg.reply('Oops, tem um erro de sintaxe aí meu caro, faz assim:\n enviar mensagem para @botDaKess mensagem: la cucaracha')
        }

})

// const idList = client.users.cache.map(u => u.id)