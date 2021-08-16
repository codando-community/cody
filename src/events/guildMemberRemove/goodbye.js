const instance = require('../../database');
const { getActiveServerByEnvMode } = require('../../utils/getActiveServer');

module.exports = (client, member) => {
  const message = `:face_with_symbols_over_mouth: *${member.user.username}#${member.user.discriminator}* saiu do server!`

  const currentServer = client.guilds.cache
    .find(server => server.id === member.guild.id)

  if (currentServer) {
    const codyInboxChannel = currentServer
      .channels.cache
      .find(channel => channel.id === getActiveServerByEnvMode().channels['mensagens-cody'])

    codyInboxChannel
      && codyInboxChannel.send(message)


    instance.select({ discord_id: member.id })
      .then(result => {
        let data = {...result[0]}

          data.active = false
        instance.updateDocument(data)
      })
      .catch(e => console.log(e))
  }
}