//acionado se um novo usuário entrar no servidor
module.exports = client => {
    client.on('guildMemberAdd', newMember => {
        const channel = newMember.guild.channels.cache.find(ch => ch.id == process.env.CHANNEL_INICIO_ID);
        channel.send(`Bem vindx ao servidor ${newMember}!\nMe chamo Cody e estarei ajudando aqui no Codando!\nMande mensagem para alguém da diretoria ou algum organizador pedindo para te autenticarem. Dessa forma você poderá ter acesso aos outros canais e conteúdos :)`);
    });
}