module.exports = client => client.on('guildMemberAdd', member => {

  client.guilds.cache
    .filter(server => server.id === process.env.SERVER_ID)
    .map(server =>
      server.channels.cache
      .filter(channel => channel.id === process.env.CHANNEL_INICIO_ID)
      .map(channel =>
        channel.send(`
        Bem vindx ao servidor ${member}, aqui é o Cody. Fico muito feliz que você tenha aceitado fazer parte da nossa comunidade!\n
        Para que você tenha acesso aos demais conteúdos do server, preciso que chame alguém da diretoria para te autenticar. Dessa forma confirmaremos que você é um aluno e te daremos acesso aos outros canais e conteúdos.\n
        **Que a força da comunidade esteja com você!**🙂`)
      )
    )

})