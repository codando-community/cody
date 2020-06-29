//acionado se um novo usuário entrar no servidor
module.exports = client => {
    client.on('guildMemberAdd', newMember => {
        const channel = newMember.guild.channels.cache.find(ch => ch.name === 'inicio');
        if (!channel) console.log("nao achei o server");
            channel.send(`Bem vindx ao servidor ${newMember}!\nMe chamo Cody e estarei ajudando aqui no Codando!\nMe chame no privado para que eu possa liberar o seu acesso aos outros canais do Codando 🙂`);
    });
}