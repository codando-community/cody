const Discord = require("discord.js");
const { getServer, getChannelByID, getLocalServerInfo } = require("../../utils/getDiscordProperties")

/**
 * @param {Discord.GuildMember} member
 */
module.exports = (member) => {
  const serverMessage = `Bem vindx ao Codando, ${member}! \nMe manda um "autenticar" no pv pra liberar o seu acesso ;)`

  const dmMessage = 'Oi, sou o Cody, um dos integrantes do Codando'
  + '\n~~mas eles insistem em dizer que eu sou só um bot... :unamused:~~'
  + '\nFico muito feliz que você tenha aceitado fazer parte da nossa comunidade!'
  + '\nEu vou te ajudar a ter acesso completo ao Discord do Codando, pra isso preciso que envie "**autenticar**"'
  + '\nAssim vou te liberar pra vc interagir nos outros canais do servidor :smile:'

  const currentServer = getServer();

  if (currentServer.id && member.guild.id) {
    const welcomeChannel = getChannelByID(getLocalServerInfo().text_channel.bem_vindo)

    welcomeChannel
      && welcomeChannel.send(serverMessage)
      && member.send(dmMessage)
  }
}