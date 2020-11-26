module.exports = (client, activeServer) =>
  client.on('ready', () => {
    client.guilds.cache
      .find(a => a.id === activeServer.server_id)
      .channels.cache.map(a => console.
        log('"%s": "%s",', a.name.toLowerCase(), a.id)
      )
  });