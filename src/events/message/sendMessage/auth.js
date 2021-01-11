module.exports = (client, activeServer, msg) => {
  console.log('auth')

  msg.react('🤖').then(r => { msg.react('👽') })

  msg
    .awaitReactions((reaction, user) => user.id !== client.user.id, { max: 2, time: 30000 })
    .then(collected => {
      console.log('collected: ', collected)
    })
    .catch(() => {
      msg.reply('Não recebi nenhuma resposta em 30 segundos, comece novamente');
    });
}