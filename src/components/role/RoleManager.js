module.exports = (client, activeServer) => client.on('message', msg => {

  const isDiretoriaMember = msg => {

    let result = false

    client.guilds.cache
    .filter(server => server.id === activeServer.server_id)
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

  const handleRole = (action, msg, array) => {
    const role = roleName => (
      client.guilds.cache
        .find(g => g.id === activeServer.server_id).roles.cache
        .find(role => role.name.toLowerCase() === roleName.toLowerCase())
    )

    const member = () => (
      client.guilds.cache
        .find(g => g.id === activeServer.server_id).members.cache
        .find(m =>
          m.user.username === array[2].split('#')[0]
          && m.user.discriminator === array[2].split('#')[1]
        )
    )

    const Add = roleName => (
      member()
        ? member().roles.add(role(roleName))
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

  if (msg.channel.type == 'dm') {
    if (msg.author !== client.user) {
      if (msg.content.toLowerCase().indexOf('role') != -1) {
        msg.content.indexOf('--') != -1
          && isDiretoriaMember(msg)
          ? handleRole(
            msg.content.split("--")[1].split(" ")[0],
            msg,
            msg.content.split(' @')
          )
          : msg.reply('Você não tem autorização para utilizar este comando, me leve para comer pizza e talvez você possa utilizá-lo 🍕😋')
      }
    }
  }
})


// content.split("--")[1].split(" ")[0]

        // )
        // if (msg.content.toLowerCase().indexOf('--add') != -1) {

        //     if (msg.mentions.users.size > 0) {
        //       if (msg.mentions.roles.size > 0) {
        //         msg.mentions.roles.map(role =>
        //           msg.mentions.users.map(user =>
        //             user.role !== role && user !== client.user && handleRole('add', msg, 'batata', role.name)
        //           )
        //         )
        //       } else {
        //         msg.reply('nao tem menção a cargo')
        //       }
        //     } else {
        //       msg.reply('sem usuario mencionado')
        //     }
        //   } else if (msg.content.toLowerCase().indexOf('--remove') != -1) {
        //     if (msg.mentions.users.size > 0) {
        //       if (msg.mentions.roles.size > 0) {
        //         msg.mentions.roles.map(role =>
        //           msg.mentions.users.map(user =>
        //             user.role !== role && user !== client.user && handleRole('remove', msg, user.id, role.name)
        //           )
        //         )
        //       } else {
        //         msg.reply('nao tem menção a cargo')
        //       }
        //     } else {
        //       msg.reply('sem usuario mencionado')
        //     }
        //   } else if (msg.content.toLowerCase().indexOf('--update') != -1) {
        //     if (msg.mentions.users.size > 0) {
        //       if (msg.mentions.roles.size > 0) {
        //         msg.mentions.roles.map(role =>
        //           msg.mentions.users.map(user =>
        //             user.role !== role && user !== client.user && handleRole('update', msg, user.id, role.name)
        //           )
        //         )
        //       } else {
        //         msg.reply('nao tem menção a cargo')
        //       }
        //     } else {
        //       msg.reply('sem usuario mencionado')
        //     }
        //   } else {
        //     msg.reply('update não pronto')
        //   }