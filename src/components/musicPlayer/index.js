module.exports = (client, activeServer) => client.on("message", async (message) => {
  const command = message.content.indexOf('!play') !== -1 ? 'play' : ''

  if(command === 'play') {
    message.member.voice.channel
    ? message.member.voice.channel.join()
        .then(connection => message.reply('Consegui conectar ao canal de voz!'))
        .catch(error => console.error(error))
    : message.reply('Você precisa entrar em um canal de voz primeiro!')

    client.player.play(message, message.content.split('!play ')[1], message.member.user)
  }

});