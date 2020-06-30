//acionado se um novo usuário entrar no servidor
let roleNames = []

module.exports = (client, idGuild) => {
    client.on('message', msg => {
        if (msg.content.indexOf('!roleUpdate') >= 0) {
            console.log(client.guilds.GuildManager)
            return roleNames;
        }
    });
}