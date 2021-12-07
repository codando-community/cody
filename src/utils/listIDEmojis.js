module.exports = (client, activeServer) =>
  client.on('ready', () => {
    let server = client.guilds.cache
      .find(a => a.id === activeServer.server_id)
      console.log(server.emojis.cache)
  });