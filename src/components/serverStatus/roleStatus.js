module.exports = (client, activeServer) => client.on('message', msg => {
  if (msg.channel.id === activeServer.text_channel.cody_bash) {
    if (msg.author !== client.user) {
      if (msg.content.toLowerCase().indexOf('server status') != -1) {
        client.guilds.cache
        .filter((server) => server.id === activeServer.server_id)
        .map(c => msg.reply(`exibindo informações sobre o servidor '${c.name}:'`) && c.roles.cache.map(role =>
          msg.reply(`cargo: ${role.name}, members: ${role.members.size}`)))
      }
    }
  }
})