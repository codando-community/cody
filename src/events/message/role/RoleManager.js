module.exports = (client, activeServer, msg) => {
  const handlRole = (option, msg, idMember, roleName) => {
    let role = client.guilds.cache
      .find((g) => g.id === activeServer.server_id)
      .roles.cache.find((role) => role.name === roleName);
    let member = client.guilds.cache
      .find((g) => g.id === activeServer.server_id)
      .members.cache.find((m) => m.id === idMember);

    switch (option) {
      case "add":
        member.roles
          .add(role)
          .then(
            msg.reply(
              `cargo ${roleName} aplicado ao usuário ${member.user.username}`
            )
          )
          .catch(console.error);
        break;

      case "remove":
        member.roles
          .remove(role)
          .then(
            msg.reply(
              `cargo ${roleName} removido do usuário ${member.user.username}`
            )
          )
          .catch(console.error);
        break;
    }
  };

  if (msg.content.indexOf("--") != -1) {
    if (msg.mentions.users.size === 1 && msg.mentions.roles.size === 1) {
      // adicionar um cargo mencionado ao usuario mencionado
      msg.mentions.roles.map((role) =>
        msg.mentions.users.map(
          (user) =>
            user.role !== role &&
            user !== client.user &&
            handlRole(
              msg.content.split("--")[1].split(" ")[0],
              msg,
              user.id,
              role.name
            )
        )
      );
    } else if (msg.mentions.users.size === 0 && msg.mentions.roles.size === 2) {
      let roleArrayId = [];
      msg.mentions.roles.map((role) => roleArrayId.push(role.name));

      msg.mentions.roles
        .find((r) => r.name === roleArrayId[0])
        .members.map((user) =>
          handlRole(
            msg.content.split("--")[1].split(" ")[0],
            msg,
            user.id,
            roleArrayId[1]
          )
        );


    } else {
      msg.reply(
        "Ops opção desconhecida, tente\n" +
          "role --add/--remove @cargo @usuario\n" +
          "Ou \n" +
          "role --add/--remove @cargoAtual @cargoASerModificado"
      );
    }
  }
};
