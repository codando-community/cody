module.exports = (client, msg) => {

  if (msg.content.toLowerCase().indexOf("--message") != -1) {
    let message = msg.content.split('--message')[1]

    message.replace('"', '').trim()

    if (msg.mentions.users.size > 0) {
      msg.mentions.users.map(u =>
        u.send(message)
        && msg.reply('enviado!')
      )
    } else if (msg.mentions.roles.size > 0) {
      msg.mentions.roles.map(r =>
        r.members.map(u =>
          u.user !== client.user && u.user.send(message)
        )
      )
    }
  } else {
    msg.reply(
      'Oops, tem um erro de sintaxe aí meu caro, faz assim:'
      +'\n send @mention_role_or_user --message "your message here"')
  }

}