// @cody role —add [member] [role]
// @cody role —del [member] [role];

const { MessageFlags } = require("discord.js")

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

  const handleRole = (option, msg, idMember, roleName) => {
    let role = client.guilds.cache.find(g => g.id === process.env.SERVER_ID).roles.cache.find(role => role.name === roleName)
    let member = client.guilds.cache.find(g => g.id === process.env.SERVER_ID).members.cache.find(m => m.id === idMember)

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

  // if (msg.channel.id === process.env.CHANNEL_CODYBASH_ID)
  if (msg.channel.name === 'cody-bash') {
    if (msg.author !== client.user) {
      if (isCodyReference) {
        if (msg.content.toLowerCase().indexOf('role') != -1)
          if (msg.content.toLowerCase().indexOf('--add') != -1) {
            if (msg.mentions.users.size > 0) {
              if (msg.mentions.roles.size > 0) {
                msg.mentions.roles.map(role =>
                  msg.mentions.users.map(user =>
                    user.role !== role && user !== client.user && handleRole('add', msg, user.id, role.name)
                  )
                )
              } else {
                msg.reply('nao tem menção a cargo')
              }
            } else {
              msg.reply('sem usuario mencionado')
            }
          } else if (msg.content.toLowerCase().indexOf('--remove') != -1) {
            if (msg.mentions.users.size > 0) {
              if (msg.mentions.roles.size > 0) {
                msg.mentions.roles.map(role =>
                  msg.mentions.users.map(user =>
                    user.role !== role && user !== client.user && handleRole('remove', msg, user.id, role.name)
                  )
                )
              } else {
                msg.reply('nao tem menção a cargo')
              }
            } else {
              msg.reply('sem usuario mencionado')
            }
          } else if (msg.content.toLowerCase().indexOf('--update') != -1) {
            if (msg.mentions.users.size > 0) {
              if (msg.mentions.roles.size > 0) {
                msg.mentions.roles.map(role =>
                  msg.mentions.users.map(user =>
                    user.role !== role && user !== client.user && handleRole('update', msg, user.id, role.name)
                  )
                )
              } else {
                msg.reply('nao tem menção a cargo')
              }
            } else {
              msg.reply('sem usuario mencionado')
            }
          } else {
            msg.reply('update não pronto')
          }
      } else {
        msg.reply('error: Cody reference not found')
      }
    }
  }
})