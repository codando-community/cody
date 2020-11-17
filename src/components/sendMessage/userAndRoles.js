module.exports = client => client.on('message', msg => {
  const isCodyReference = msg.mentions.users.filter(u => u === client.user).size === 1

  const isDiretoriaMember = (msgAuthor) => {
    let diretoriaUserList = []

    client.guilds.cache.map(c =>
      c.roles.cache.map(role =>
        role.id === process.env.ROLE_DIRETORIA_ID
        && role.members.map(m => diretoriaUserList.push(m.user))))

    return diretoriaUserList.filter(m => m === msgAuthor)[0]
  }

  if (msg.channel.id === process.env.CHANNEL_TESTEBOT_ID)
    if (msg.author !== client.user)
      if (msg.content.toLowerCase().indexOf('enviar para') != -1)
        if (msg.content.toLowerCase().indexOf('mensagem:') != -1) {
          if (!isCodyReference) {
            if (isDiretoriaMember(msg.author)) {
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