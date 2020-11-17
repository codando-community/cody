module.exports = client => client.on('guildMemberAdd', member => {

  client.guilds.cache
    .filter(server => server.id === process.env.SERVER_ID)
    .map(server =>
      server.channels.cache
      .filter(channel => channel.id === process.env.CHANNEL_INICIO_ID)
      .map(channel =>
        channel.send(`Bem vindx ao servidor ${member}!\nMe chamo Cody e estarei ajudando aqui no Codando!\nMande mensagem para alguém da diretoria ou algum organizador pedindo para te autenticarem. Dessa forma você poderá ter acesso aos outros canais e conteúdos :)`)
      )
    )

})