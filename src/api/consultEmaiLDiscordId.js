const instance = require("./instance");

module.exports = (client) =>
  client.on("message", (msg) => {
    const isDiretoriaMember = (msg) => {
      let result = false;

      client.guilds.cache
        .filter((server) => server.id === activeServer.server_id)
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
          msg.content.toLowerCase().indexOf("read") != -1 &&
          isDiretoriaMember
        ) {
          if (msg.content.toLowerCase().indexOf("email") != -1) {
            instance
              .select({
                contact: {
                  email: msg.content
                    .substring(msg.content.lastIndexOf(" "))
                    .trim(),
                },
              })
              .then((result) => {
                msg.reply(
                  `Nome:  ${result[0].name}  \nUniversidade: ${result[0].university} \nCampus: ${result[0].campus} \nData de nascimento: ${result[0].date_of_birth}`
                );
              });
          } else if (msg.content.toLowerCase().indexOf("r.a") != -1) {
          } else if (msg.content.toLowerCase().indexOf("discord") != -1) {
          }
        }
      }
    }
  });
