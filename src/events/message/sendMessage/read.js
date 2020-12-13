const instance = require("../../../database");

module.exports = (client, activeServer) =>
  client.on("message", (msg) => {

    const Email = () => {
      instance
        .select({
          contact: {
            email: msg.content.substring(msg.content.lastIndexOf(" ")).trim(),
          },
        })
        .then((result) => {
          console.log('result: ', result)

          msg.reply(
              `Nome: ${result[0].name}` +
              `\nUniversidade: ${result[0].university}` +
              `\nCampus: ${result[0].campus}` +
              `\nR.A: ${result[0].registration}` +
              `\nTelefone: ${result[0].contact.cell_phone}` +
              `\nData de nascimento: ${result[0].date_of_birth}`
            )
        })
        .catch((err) => {
          msg.reply("Aluno não encontrado.");
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
            `Nome: ${result[0].name}` +
            `\nUniversidade: ${result[0].university}` +
            `\nCampus: ${result[0].campus}` +
            `\nEmail: ${result[0].contact.email}` +
            `\nTelefone: ${result[0].contact.cell_phone}` +
            `\nData de nascimento: ${result[0].date_of_birth}`
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
          console.log('(discord) result:', result)
          msg.reply(
            `Nome: ${result[0].name}` +
            `\nUniversidade: ${result[0].university}` +
            `\nCampus: ${result[0].campus}` +
            `\nEmail: ${result[0].contact.email}` +
            `\nTelefone: ${result[0].contact.cell_phone}` +
            `\nData de nascimento: ${result[0].date_of_birth}`
          )
        })
        .catch((err) => {
          msg.reply("Aluno não encontrado.");
        })
    };

    if (msg.channel.id === activeServer.text_channel.cody_bash) {
      if (msg.author !== client.user) {
        if (msg.content.toLowerCase().indexOf("read") != -1) {

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

        }
      }
    }
  });
