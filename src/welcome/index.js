//acionado se um novo usuário entrar no servidor
module.exports = client => {
    client.on('guildMemberAdd', newMember => {
        const channel = newMember.guild.channels.cache.find(ch => ch.name === 'inicio');
        channel.send(`Bem vindx ao servidor ${newMember}!\nMe chamo Cody e estarei ajudando aqui no Codando!\nMande a palavra **autenticar** no privado para que eu possa liberar o seu acesso aos outros canais do Codando 🙂\nCaso tenha problemas, mande mensagem no canal de #ajuda`);
    });
}