module.exports = (client, activeServer, member) => {
  const serverMessage = `Bem vindx ao servidor ${member}, aqui é o Cody,`
    + ' sou um dos integrantes do Codando (mas eles insistem em dizer que eu sou só um bot... :unamused:)'
    + '\nFico muito feliz que você tenha aceitado fazer parte da nossa comunidade!'
    + '\nPra eu liberar seu acesso completo aqui no server, **preciso que você chame alguém da diretoria ou organizador para fazer a sua autenticação.** '
    + 'Assim vou ter certeza que você é um aluno e vou deixar você ter acesso aos outros canais do servidor :smile:'
    + '\n\n**Que a força da comunidade esteja com você!**'

  const dmMessage = 'Oi, sou o Cody, acabei de falar com você no canal bem-vindo.'
    + ' Agora vou te ajudar com o acesso aos outros canais e conteúdos da Comunidade.'
    + ' COPIE EXATAMENTE uma das mensagens a baixo, de acordo com o desejado, para prosseguimos:'
    + '\n\n**Autenticar SEU_RA**'
    + '\nou'
    + '\n**Conversar com um Organizador**' +
    '\n\nDúvidas sobre autenticação? clique no link: https://www.notion.so/D-vidas-Autentica-o-59cebf827d5e4abf98e95633d13abbab'

  const currentServer = client.guilds.cache
    .find(server => server.id === member.guild.id)

  if (currentServer) {
    const welcomeChannel = currentServer
      .channels.cache
      .find(channel => channel.id === activeServer.text_channel.bem_vindo)

    welcomeChannel
      && welcomeChannel.send(serverMessage)
  }
}