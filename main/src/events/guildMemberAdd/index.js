const Welcome = require("./welcome");

module.exports = (client, activeServer) => {
  client.on('guildMemberAdd', member => {
    Welcome(client, activeServer, member)
  })
}