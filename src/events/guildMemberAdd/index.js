const Welcome = require("./welcome");

module.exports = (client) => {
  client.on('guildMemberAdd', member => {
    Welcome(client, member)
  })
}