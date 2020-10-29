// @cody role —add [member] [role]
// @cody role —del [member] [role];

module.exports = client => {
  client.on('message', msg => {
    if (msg.guild.id === process.env.SERVER_TEST_ID) {
      console.log('ta no servidor de teste')
    }
  })
}