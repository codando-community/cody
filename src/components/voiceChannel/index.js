module.exports = (client) =>
  client.on("message", (msg) => {
    const isDiretoriaMember = (msg) => {
      let result = false;

      client.guilds.cache
        .filter((server) => server.id === process.env.SERVER_ID)
        .map((server) => {
          server.roles.cache
            .filter((role) => role.name.toLowerCase() === "diretoria")
            .map((diretoria) => (roleId = diretoria.id));

          server.members.cache.map(
            (member) =>
              member.user.username.toLowerCase() ===
                msg.channel.recipient.username.toLowerCase() &&
              member.user.discriminator ===
                msg.channel.recipient.discriminator &&
              (result = true)
          );
        });

      return result;
    };

    if (msg.channel.type == "dm") {
      if (msg.author !== client.user) {
        if (
          msg.content.toLowerCase().indexOf("voice") != -1 &&
          msg.content.toLowerCase().indexOf("--log") != -1
        ) {
          if (isDiretoriaMember) {
            const channel = client.guilds.cache
              .find((g) => g.id === process.env.SERVER_ID)
              .channels.cache.find(
                (ch) => ch.id == process.env.CHANNEL_TALKS_VOICE
              );
            channel.members.map((u) =>
              msg.reply(u.user.username + "#" + u.user.discriminator)
            );
          }
        }else{
          msg.reply('Você não tem autorização para utilizar este comando, me leve para comer pizza e talvez você possa utilizá-lo 🍕😋')
        }
      }
    }

    /*  const channel =   client.guilds.cache.find(g => g.id === process.env.SERVER_ID).channels.cache.find(ch => ch.id == process.env.CHANNEL_TALKS_VOICE);
  channel.join()
  const channelcaixa =   client.guilds.cache.find(g => g.id === process.env.SERVER_ID).channels.cache.find(ch => ch.id == process.env.CHANNEL_CAIXA_DE_ENTRADA);
  channel.members.map( u => console.log( u.user.username+'#' + u.user.discriminator) )
  if(newMember.member === oldMember.member) {
    channel.members.map( u => console.log(u.user.username+'#' + u.user.discriminator) )
  }
  msg.reply
*/
  });
