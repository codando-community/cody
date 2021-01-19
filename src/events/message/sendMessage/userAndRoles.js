module.exports = (client, msg) => {

  if (msg.content.toLowerCase().indexOf("--message") != -1) {
    let message = msg.content.split('--message')[1]
    const getMessage = new RegExp(/(".*?")/g)

    message = message.match(getMessage)[0]

    message = message.replace('"', '').replace('"', '').trim()

    if (msg.mentions.users.size > 0) {
      msg.mentions.users.map(u =>
        u.send(message)
        && msg.reply('enviado!')
      )
    } else if (msg.mentions.roles.size > 0) {
      msg.mentions.roles.map(r =>
        r.members.map(u =>
          u.user !== client.user && u.user.send(message)
        ) && msg.reply('enviado!')
      )
    }
  } else {
    msg.reply(
      ':face_with_symbols_over_mouth: tem um erro de sintaxe aí meu caro, faz assim:'
      +'\n send @cargo_ou_usuario --message "mensagem né"')
  }
}