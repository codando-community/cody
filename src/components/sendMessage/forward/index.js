module.exports = client => client.on('message', msg => {

  if (msg.channel.type == 'dm') {
    if (msg.author !== client.user) {
         const channel =   client.guilds.cache.find(g => g.id === process.env.SERVER_ID).channels.cache.find(ch => ch.id == process.env.CHANNEL_CAIXA_DE_ENTRADA);
         channel.send("** Mensagem enviada por **: "+ msg.channel.recipient.username + "#" + msg.channel.recipient.discriminator +"\n ** Conteúdo: **"
                                                    +  msg.content)
    }
  }
})

