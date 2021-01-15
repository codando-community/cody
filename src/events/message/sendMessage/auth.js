const instance = require('../../../database');

//TODO adicionar link com pagina publia do notion ajudando no processo de autenticação
module.exports = (client, activeServer, msg) => {
  const RA = msg.content.toLowerCase().split('autenticar ')[1]
  //-----------------------[START] - CODIGO DAVI-------------------------//
  if (msg.content.toLowerCase().indexOf('sim, está correto ') !== -1) {
    const ra = msg.content.toLowerCase().split('sim, está correto ')[1]
    instance
      .select({ registration: Number(ra) })
      .then(result => {
        let { type } = result[0]

        switch (type) {
          case 'organizador':
              type = 'Veterano'
            break;
          case 'pre_calouro':
              type = 'Pre-calouro'
            break;

          case 'calouro':
              type = 'Calouro'
            break;
        }
      //-------------------------------------------------//
      let role = client.guilds.cache.find(g => g.id === activeServer.server_id).roles.cache.find(role => role.name === type)
      let member = client.guilds.cache.find(g => g.id === activeServer.server_id).members.cache.find(m => m.id === msg.channel.recipient.id)

      member.roles.add(role)
        .then(
          msg.reply(`Seja bem vindo a nossa comunidade ! O seu acesso aos canais já foi liberado.`
          +`\nQue a força da comunidade esteja com você :vulcan:`)
        )
        .catch(console.error)
      })
      .catch((err) => {
        console.trace(err)
      });
    }
  //-----------------------[END] - CODIGO DAVI-------------------------//
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
    })
    .catch((err) => {
      msg.reply(
        'Ops, parece que algo deu errado. ' +
        '\nPodemos tentar novamente digitando: Autenticar SEU_RA' +
        '\nOu envie: Conversar com um Organizador' +
        '\n\nDúvidas sobre autenticação? clique no link: [link do notion]'
      );
    });
}