module.exports = (client, activeServer, msg, channelID) => {
  const channel = client.guilds.cache
    .find(g => g.id === activeServer.server_id).channels.cache
    .find(ch => ch.id == channelID)

  if (channelID === activeServer.text_channel.auth) {
    if (msg.content.toLowerCase().indexOf('não, há divergências') !== -1) {
      msg.reply(
        'Ops, desculpe o inconveniente.' +
        '\nNossa equipe entrará em contato afim de esclarecer o ocorrido.'
      );

      channel.send(
        msg.channel.recipient.username + '#'
        + msg.channel.recipient.discriminator
        + ' teve problemas na autenticação, favor verificar')

    } else if (msg.content.toLowerCase().indexOf('conversar com um organizador') !== -1) {
      msg.reply('Nossa equipe entrará em contato.');

      channel.send(
        msg.channel.recipient.username + "#"
        + msg.channel.recipient.discriminator
        + " gostaria de esclarecer algumas duvidas antes de ser autenticado")
    }
  } else {
    if (msg.content.toLowerCase().indexOf('sim, está correto ') !== -1) {
      channel.send(
        "Aluno "
        + msg.channel.recipient.username + "#"
        + msg.channel.recipient.discriminator
        + " autenticado com sucesso!")

    } else {
      channel.send(
        "** Mensagem enviada por **: "
        + msg.channel.recipient.username + "#"
        + msg.channel.recipient.discriminator
        + "\n ** Conteúdo: **"
        + msg.content)
    }
  }
}