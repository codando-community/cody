module.exports = (client, activeServer, member) => {

  client.guilds.cache
    .find(server => server.id === member.guild.id)
      .channels.cache
        .find(channel => channel.id === activeServer.text_channel.bem_vindo)
          .send(
            `Bem vindx ao servidor ${member}, aqui é o Cody.\n`
            + 'Fico muito feliz que você tenha aceitado fazer parte da nossa comunidade!\n'
            + 'Para que você tenha acesso aos demais conteúdos do server, preciso que chame alguém da diretoria para te autenticar. Dessa forma confirmaremos que você é um aluno e te daremos acesso aos outros canais e conteúdos.\n'
            + '**Que a força da comunidade esteja com você!** 🙂'
          )

}