module.exports = (client, activeServer, msg) => {

  if (msg.content.toLowerCase().includes("--role")) {
    client.guilds.cache
      .filter(server => server.id === activeServer.server_id)
      .map(
        (guild) => {
          let temp = `exibindo informações sobre o servidor **${guild.name}**\n`;

          guild.roles.cache.map(
            (role) => {
              temp += `cargo: ${role.name}, members: ${role.members.size}\n`;
            });

          msg.reply(temp);
        });
  }
};
