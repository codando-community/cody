module.exports = (client, activeServer) => client.on('guildMemberAdd', member => {

  client.guilds.cache
    .filter(server => server.id === activeServer.server_id)
    .map(server =>
      server.channels.cache
      .filter(channel => channel.id === activeServer.text_channel.bem_vindo)
      .map(channel =>
        channel.send(
        `Bem vindx ao servidor ${member}, aqui é o Cody.\n`
        + 'Fico muito feliz que você tenha aceitado fazer parte da nossa comunidade!\n'
        + 'Para que você tenha acesso aos demais conteúdos do server, preciso que chame alguém da diretoria para te autenticar. Dessa forma confirmaremos que você é um aluno e te daremos acesso aos outros canais e conteúdos.\n'
        + '**Que a força da comunidade esteja com você!** 🙂'
        )
      )
    )

})