module.exports = (client, activeServer) => client.on('message', msg => {
  const isCodyReference = msg.mentions.users.filter(u => u === client.user).size === 1

  if (msg.channel.id === activeServer.text_channel.cody_bash)
    if (msg.author !== client.user)
      if (msg.content.toLowerCase().indexOf('enviar para') != -1)
        if (msg.content.toLowerCase().indexOf('mensagem:') != -1) {
          if (!isCodyReference) {
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
          } else {
            msg.reply('Você ta fazendo besteira')
          }
        } else {
          msg.reply('Oops, tem um erro de sintaxe aí meu caro, faz assim:\n enviar mensagem para @botDaKess mensagem: la cucaracha')
        }

})