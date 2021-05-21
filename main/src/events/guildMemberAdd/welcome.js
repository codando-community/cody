module.exports = (client, activeServer, member) => {
  const serverMessage = `Bem vindx ao Codando, ${member}!`

  const dmMessage = 'Oi, sou o Cody, um dos integrantes do Codando (mas eles insistem em dizer que eu sou só um bot... :unamused:)'
  + '\nFico muito feliz que você tenha aceitado fazer parte da nossa comunidade!'
  + '\nEu vou te ajudar a ter acesso completo ao servidor do Codando, pra isso preciso que você me avise que **quer fazer parte do Codando** ou que quer **ser autenticado do Codando**'
  + 'Assim vou ter certeza e dar prosseguimento ok? (estou esperando :smiley:) que você é um aluno e vou deixar você ter acesso aos outros canais do servidor :smile:'

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