module.exports = (client, activeServer, member) => {
  const serverMessage = `Bem vindx ao servidor ${member}, aqui é o Cody,`
    + ' sou um dos integrantes do Codando (mas eles insistem em dizer que eu sou só um bot... :unamused:)'
    + '\nFico muito feliz que você tenha aceitado fazer parte da nossa comunidade!'
    + '\nPra eu liberar seu acesso completo aqui no server, eu vou te chamar no privado para a gente fazer sua autenticação.'
    + 'Assim vou ter certeza que você é um aluno e vou deixar você ter acesso aos outros canais do servidor. Te vejo no pv :smile:'
    + '\n\n**Que a força da comunidade esteja com você!**'

  const dmMessage = 'Oi, sou o Cody, acabei de falar com você no canal bem-vindo e também já nos falamos antes pelo WhatsApp.'
    + ' Agora estou aqui pra te ajudar a ter acesso aos outros canais e conteúdos da Comunidade. Escolhe com quem gostaria de ser autenticado.'
    + ' MANDE EXATAMENTE:'
    + '\n\n1 - Autenticar SEU_RA'
    + '\n2 - Conversar com um Organizador'

  const currentServer = client.guilds.cache
    .find(server => server.id === member.guild.id)

  if (currentServer) {
    const welcomeChannel = currentServer
      .channels.cache
      .find(channel => channel.id === activeServer.text_channel.bem_vindo)

    welcomeChannel
      && welcomeChannel.send(serverMessage)
      && member.send(dmMessage)
  }
}