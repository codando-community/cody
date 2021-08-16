const Goodbye = require('./goodbye');

module.exports = (client) => {
  client.on('guildMemberRemove', member => {
    Goodbye(client, member);
  })
}