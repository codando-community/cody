module.exports = (client, activeServer, msg) => {

  if (msg.content.toLowerCase().includes("--role")) {
    client.guilds.cache
      .filter(server => server.id === activeServer.server_id)
      .map(
        (guild) => {
          let title = `Exibindo quantidade de membros por cargo no servidor **${guild.name}**\n`;
          let body = '';
          let roleArray = [];

          guild.roles.cache.map(role => roleArray.push({
            roleName: role.name.replace('@', ''),
            count: role.members.size
          }));

          roleArray.map(role => {
            body += role.count + '  -  ' + role.roleName + '\n';
          })

          msg.reply(title + '\n' + body);
        });
  }
};
