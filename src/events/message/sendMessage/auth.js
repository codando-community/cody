const instance = require('../../../database');
const Forward = require('./forward')

//TODO adicionar link com pagina publia do notion ajudando no processo de autenticação
module.exports = (client, activeServer, msg) => {

  if (msg.content.toLowerCase().indexOf('autenticar ') !== -1) {
    let RA = msg.content.toLowerCase().split('autenticar ')[1]

    instance
      .select({ registration: Number(RA) })
      .then(result => {
        const { university, campus } = result[0]
        msg.reply(
          `Você está cursando a faculdade na **${university}**, na unidade **${campus}**?` +
          '\n**Responda copiando** exatamente uma das frases a seguir e me enviando' +
          '\nSim, está correto SEU_RA' +
          '\nNão, há divergências'
        )

        data = result[0]
        data.join_auth = true
        instance.updateDocument(data)
      })
      .catch(() => {
        msg.reply(
          'Ops, parece que algo deu errado. ' +
          '\nPodemos tentar novamente digitando: Autenticar SUBSTITUA_ESTE_ESPAÇO_COM_SEU_RA' +
          '\nOu envie: Conversar com um Organizador' +
          '\n\nDúvidas sobre autenticação? clique no link: https://www.notion.so/D-vidas-Autentica-o-59cebf827d5e4abf98e95633d13abbab'
        );
      });

  } else if (msg.content.toLowerCase().indexOf('sim, está correto ') !== -1) {
    let RA = msg.content.toLowerCase().split('sim, está correto ')[1]

    instance
      .select({ registration: Number(RA) })
      .then(result => {
        let { type, join_auth } = result[0]

        switch (type) {
          case 'pre_calouro':
            type = 'Pre-calouro'
            break;

          case 'calouro':
            type = 'Calouro'
            break;

          default:
            type = null
            break;
        }

        let role = client.guilds.cache.find(g => g.id === activeServer.server_id)
          .roles.cache.find(role => role.name === type)
        let member = client.guilds.cache.find(g => g.id === activeServer.server_id)
          .members.cache.find(m => m.id === msg.channel.recipient.id)


        if (join_auth && role) {
          member.roles.add(role)
            .then(() => {
              msg.reply('Seja bem vindo a nossa comunidade! O seu acesso aos canais já foi liberado.'
                + '\nQue a força da comunidade esteja com você :vulcan:'
              )

              data = result[0]
              data.active = true
              data.contact.discord = msg.channel.recipient.username + '#' + msg.channel.recipient.discriminator
              data.contact.id_discord = msg.channel.recipient.id

              instance.updateDocument(data)
              Forward(client, activeServer, msg, activeServer.text_channel.mensagens_cody)
            })
            .catch(() => {
              msg.reply(
                'Ops, parece que algo deu errado. ' +
                '\nPodemos tentar novamente digitando: Autenticar SEU_RA' +
                '\nOu envie: Conversar com um Organizador' +
                '\n\nDúvidas sobre autenticação ? clique no link: https://www.notion.so/D-vidas-Autentica-o-59cebf827d5e4abf98e95633d13abbab'
              )
            })
        } else {
          msg.reply(
            'Ops, digite: Autenticar SEU_RA' +
            '\n\nDúvidas sobre autenticação ? clique no link: https://www.notion.so/D-vidas-Autentica-o-59cebf827d5e4abf98e95633d13abbab'
          )
        }
      })
      .catch((err) => {
        console.trace(err)
      });
  }

}