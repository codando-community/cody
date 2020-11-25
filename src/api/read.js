const instance = require("./instance");

module.exports = (client, activeServer) =>
  client.on("message", (msg) => {
    const isDiretoriaMember = (msg) => {
      let result = false;
      let roleId = null;
      if (msg.channel.recipient) {
        client.guilds.cache
          .filter((server) => server.id === activeServer.server_id)
          .map((server) => {
            server.roles.cache
              .filter((role) => role.name.toLowerCase() === "calouro")
              .map((diretoria) => (roleId = diretoria.id));

            server.members.cache.filter(
              (member) =>
                member._roles.filter((r) => r === roleId)!== [] &&
                member.user.username.toLowerCase() ===
                  msg.channel.recipient.username.toLowerCase() &&
                member.user.discriminator ===
                  msg.channel.recipient.discriminator
                  && (result = true))
          });
      }
      return result;
    };
    const Email = () => {
      instance
        .select({
          contact: {
            email: msg.content.substring(msg.content.lastIndexOf(" ")).trim(),
          },
        })
        .then((result) => {
          msg
            .reply(
              `Nome:  ${result[0].name}  \nUniversidade: ${result[0].university} \nCampus: ${result[0].campus} \nData de nascimento: ${result[0].date_of_birth} \nR.A: ${result[0].registration}`
            )
            .catch((err) => {
              msg.reply("Aluno não encontrado.");
            });
        });
    };

    const RA = () => {
      instance
        .select({
          registration: Number(
            msg.content.substring(msg.content.lastIndexOf(" ")).trim()
          ),
        })
        .then((result) => {
          console.log(result);
          msg.reply(
            `Nome:  ${result[0].name}  \nUniversidade: ${result[0].university} \nCampus: ${result[0].campus} \nData de nascimento: ${result[0].date_of_birth}`
          );
        })
        .catch((err) => {
          msg.reply("Aluno não encontrado.");
        });
    };

    const Discord = () => {
      instance
        .select({
          contact: {
            discord: msg.content.substring(msg.content.lastIndexOf(" ")).trim(),
          },
        })
        .then((result) => {
          msg
            .reply(
              `Nome:  ${result[0].name}  \nUniversidade: ${result[0].university} \nCampus: ${result[0].campus} \nData de nascimento: ${result[0].date_of_birth}`
            )
            .catch((err) => {
              msg.reply("Aluno não encontrado.");
            });
        });
    };

    if (msg.channel.type == "dm") {
      if (msg.author !== client.user) {
        if (msg.content.toLowerCase().indexOf("read") != -1) {
          if (isDiretoriaMember(msg)) {
            console.log("isdiretoriamenber", isDiretoriaMember(msg));
            switch (msg.content.toLowerCase().trim().split(" ")[1]) {
              case "email":
                Email();
                break;

              case "r.a":
                RA();
                break;

              case "discord":
                Discord();
                break;

              default:
                msg.reply(
                  "erro: parâmetro não encontrado, tente read [discord email r.a] [informação] "
                );
                break;
            }
          } else {
            msg.reply(
              "Você não tem autorização para utilizar este comando, me leve para comer pizza e talvez você possa utilizá-lo 🍕😋"
            );
          }
        }
      }
    }
  });
