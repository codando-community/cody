module.exports = (client, activeServer, msg) => {
  if (msg.content.toLowerCase().indexOf("--role") != -1) {
    client.guilds.cache
      .filter((server) => server.id === activeServer.server_id)
      .map((c) => {
        let temp = `exibindo informações sobre o servidor **${c.name}**\n`;
        c.roles.cache.map((role) => {
          temp += `cargo: ${role.name}, members: ${role.members.size}\n`;
        });
        msg.reply(temp);
      });
  }
};
