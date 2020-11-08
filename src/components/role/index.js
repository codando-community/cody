module.exports = client => client.on('message', msg => {
  const isDiretoriaMember = msg => {

    let diretoriaUserList = []

    client.guilds.cache.map(c =>
      c.roles.cache.map(role =>
        role.name.toLowerCase() === 'diretoria'
        && role.members.map(m => diretoriaUserList.push(m.user))))

    return diretoriaUserList.filter(m => m.username === msg.channel.recipient.username)[0]
  }

  const handleRole = (action, msg, array) => {
    const role = roleName => (
      client.guilds.cache
        .find(g => g.id === process.env.SERVER_ID).roles.cache
        .find(role => role.name.toLowerCase() === roleName.toLowerCase())
    )

    const member = () => (
      client.guilds.cache
        .find(g => g.id === process.env.SERVER_ID).members.cache
        .find(m =>
          m.user.username === array[2].split('#')[0]
          && m.user.discriminator === array[2].split('#')[1]
        )
    )

    const Add = roleName => (
      member().roles.add(role(roleName))
        .then(msg.reply(`cargo ${role(roleName).name} aplicado ao usuário ${member().user.username} 👍`))
        .catch(console.error)
    )

    const Remove = roleName => (
      member().roles.remove(role(roleName))
        .then(msg.reply(`cargo ${role(roleName).name} removido ao usuário ${member().user.username} 👍`))
        .catch(console.error)
    )

    switch (action) {
      case 'add':
        Add(array[1])
        break;

      case 'remove':
        Remove(array[1])
        break;

      default:
        msg.reply('erro: parâmetro não encontrado')
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
            msg.content.split(' @'))
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