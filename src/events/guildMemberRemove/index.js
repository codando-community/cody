const Goodbye = require('./goodbye');

module.exports = (client, activeServer) => {
  client.on('guildMemberRemove', member => {
    Goodbye(client, activeServer, member);
  })
}