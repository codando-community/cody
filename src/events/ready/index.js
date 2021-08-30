module.exports = (client, activeServer, config) => client.on('ready', () => {
  config.prod.server_id === activeServer.server_id
    ? client.user.setActivity('codandocommunity.com', { type: 'WATCHING' })
    && console.log('Em ambiente de produção!')

    : client.user.setActivity('instagram/codando.community', { type: 'WATCHING' })
    && console.log('Em ambiente de desenvolvimento.');
});