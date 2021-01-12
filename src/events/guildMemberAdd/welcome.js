const Auth = require('../message/sendMessage/auth')

module.exports = (client, activeServer, member) => {

  client.guilds.cache
    .find(server => server.id === member.guild.id)
      .channels.cache
        .find(channel => channel.id === activeServer.text_channel.bem_vindo)
          .send(`${member} entrou`)

  member.send('Olá, sou o Cody e tals, Você prefere ser autenticado por:\n 1 - mim\n 2 - um humano')

}