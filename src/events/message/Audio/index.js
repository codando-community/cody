module.exports = (client, activeServer) => client.on("message", (msg) => {
    const channel = client.guilds.cache
      .find((g) => g.id === activeServer.server_id)
      .channels.cache.find((ch) => ch.id == activeServer.voice_channel.talks);

  if (
    msg.content.toLowerCase().indexOf("voice") != -1 &&
    msg.content.toLowerCase().indexOf("--log") != -1
  ) {
    if (msg.content.toLowerCase().indexOf("-m") != -1) {
      channel.members.map((u) =>
        u.send(
          msg.content
            .replace("-m", "")
            .replace("--log", "")
            .replace("voice", "")
            .trim()
        )
      );
    } else {
      channel.members.map((u) =>
        msg.reply(u.user.username + "#" + u.user.discriminator)
      );
    }
  }
});
