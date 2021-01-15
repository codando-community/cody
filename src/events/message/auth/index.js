const instance = require("../../../database");

module.exports = (client, activeServer, msg) => {
  const RA = msg.content.split('"')[1].trim()

  if (msg.content.toLowerCase().indexOf("--ra") !== -1) {
    if (msg.mentions.users.size === 1) {
      const user = msg.mentions.users.find(u => u)

      instance.select({ registration: Number(RA) })
        .then(result => {
          let { type } = result[0]

          switch (type) {
            case 'pre_calouro':
              type = 'Pre-calouro'
              break;

            case 'calouro':
              type = 'Calouro'
              break;

            case 'organizador':
              type = 'organizador'
              break;

            default:
              msg.reply('unexpected type, received: ' + type)
              type = null
              break;
          }

          let role = client.guilds.cache.find(g => g.id === activeServer.server_id)
            .roles.cache.find(role => role.name === type)

          let member = client.guilds.cache.find(g => g.id === activeServer.server_id)
            .members.cache.find(m => m.id === user.id)

          if (role && type !== 'organizador') {
            member.roles.add(role)
              .then(() => {
                user.send('Seja bem vindo a nossa comunidade! O seu acesso aos canais já foi liberado.'
                  + `\nUm organizador acabou de me contar que você é um ${type}, que legal!!`
                )
                msg.reply(`Acabei de avisar o ${user.username}#${user.discriminator} que o acesso dele  como **${type}** foi **liberado**`)

                data = result[0]
                data.join_auth = true
                data.active = true
                data.contact.discord = user.username + '#' + user.discriminator
                data.contact.id_discord = user.id

                instance.updateDocument(data)
              })
          } else if (type === 'organizador') {
            msg.reply('Ops, não tenho autorização para concedor o cargo de organizador a ninguém')
          } else {
            msg.reply('Erro na autenticação, role: ' + type)
          }
        })
        .catch(() => {
          msg.reply('RA não encontrado')
        })
    }
  }
}