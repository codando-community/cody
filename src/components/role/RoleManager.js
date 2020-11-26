module.exports = (client, activeServer) => client.on('message', msg => {
  const handleMention = (option, msg, idMember, roleName) => {
    let role = client.guilds.cache.find(g => g.id === activeServer.server_id).roles.cache.find(role => role.name === roleName)
    let member = client.guilds.cache.find(g => g.id === activeServer.server_id).members.cache.find(m => m.id === idMember)

    switch (option) {
      case 'add':
        member.roles.add(role)
          .then(
            msg.reply(`cargo ${roleName} aplicado ao usuário ${member.user.username}`)
          )
          .catch(console.error)
        break;

      case 'remove':
        member.roles.remove(role).catch(console.error)
        break;

      case 'update':
        // TODO
        break;

      default:

        break;
    }
  }

  /**
   * Adiciona ou remove um cargo mencionado de um usuario não mencionado
   * @param {String} action
   * @param {String} msg
   * @param {Array} array
   */
  const handleWithoutUserMention = (action, msg, array) => {
    const member = () => {
      let temp = array[1].split(' ')[0]
      console.log('temp: ', temp)

      client.guilds.cache
        .find(g => g.id === activeServer.server_id).members.cache
        .find(m =>
          m.user.username === temp.split('#')[0]
          && m.user.discriminator === temp.split('#')[1]
        )
    }

    const Add = roleName => (
      member()
        ? msg.mentions.roles.map(role => member().roles.add(role))
          .then(msg.reply(`cargo ${role(roleName).name} aplicado ao usuário ${member().user.username} 👍`))
          .catch(console.error)
        : msg.reply('Essa funcionalidade ainda não está pronta')
    )

    const Remove = roleName => (
      member()
        ? member().roles.remove(role(roleName))
          .then(msg.reply(`cargo ${role(roleName).name} removido ao usuário ${member().user.username} 👍`))
          .catch(console.error)
        : msg.reply('Essa funcionalidade ainda não está pronta')
    )

    switch (action) {
      case 'add':
        Add(array[1])
        break;

      case 'remove':
        Remove(array[1])
        break;

      default:
        msg.reply('erro: parâmetro não encontrado, tente role [--add / --remove]')
        break;
    }
  }

  if (msg.channel.id === activeServer.text_channel.cody_bash) {
    if (msg.author !== client.user) {
      if (msg.content.toLowerCase().indexOf('role') != -1) {
        if (msg.content.indexOf('--') != -1) {
          if (msg.mentions.users.size === 1 && msg.mentions.roles.size === 1) {
            // adicionar um cargo mencionado ao usuario mencionado
            msg.mentions.roles.map(role =>
              msg.mentions.users.map(user =>
                user.role !== role
                && user !== client.user
                && handleMention(msg.content.split("--")[1].split(" ")[0], msg, user.id, role.name)
              )
            )
          } else if (msg.mentions.users.size === 0 && msg.mentions.roles.size === 2) {
            // TODO adicionar o segundo cargo aos usuarios pertencentes ao primeiro cargo
          } else if (msg.mentions.users.size === 0 && msg.mentions.roles.size === 1) {
            // adicionar um cargo mencionadoa um usuario que não tem acesso ao canal
            // fazendo um split no @[username]#[discriminator] e pegando o seu id

            handleWithoutUserMention(
              msg.content.split("--")[1].split(" ")[0],
              msg,
              msg.content.split(' @')
            )
          } else {
            // aleatoriedades, ta na disney mano
          }
        }
      }
    }
  }
})