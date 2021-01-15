const instance = require('../../../database');

//TODO adicionar link com pagina publia do notion ajudando no processo de autenticação
module.exports = (client, activeServer, msg) => {
  const RA = msg.content.toLowerCase().split('autenticar ')[1]

  instance
    .select({ registration: Number(RA) })
    .then(result => {
      const { university, campus } = result[0]
      msg.reply(
        `Você está cursando a faculdade na **${university}**, na unidade **${campus}**?` +
        '\n**Responda copiando** exatamente uma das frases a seguir e me enviando' +
        '\nSim, está correto' +
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