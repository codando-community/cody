module.exports = (client, activeServer) =>
  client.on("guildMemberRemove", (member) => {
    const channel = client.guilds.cache
      .find((g) => g.id === activeServer.server_id)
      .channels.cache.find(
        (ch) => ch.id === activeServer.text_channel.mensagens_cody
      );

    channel.send(`O aluno *${member.user.username}#${member.user.discriminator}* saiu do server!`);
  });
