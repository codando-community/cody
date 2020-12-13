module.exports = (client, activeServer, msg) => {
    const channel = client.guilds.cache
      .find((g) => g.id === activeServer.server_id)
      .channels.cache.find((ch) => ch.id == activeServer.voice_channel.talks);

  switch (msg.content.toLowerCase().split(' ')[1]) {
    case '--message':
      channel.members.map(u =>
        u.send(
          msg.content
            .replace('--m', '')
            .replace('--list', '')
            .replace('voice', '')
            .replace('"', '')
            .trim()
        )
      );
    break;

    case '--list':
      channel.members.map(u =>
        msg.reply(u.user.username + '#' + u.user.discriminator)
      );
    break;
  }
}