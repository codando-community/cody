//acionado se um novo usuário entrar no servidor
module.exports = client => {
    client.on('guildMemberAdd', newMember => {
        const channel = newMember.guild.channels.cache.find(ch => ch.id == process.env.CHANNEL_INICIO_ID);
        channel.send(`Bem vindx ao servidor ${newMember}!\nMe chamo Cody e estarei ajudando aqui no Codando!\nMande mensagem para alguém da diretoria ou algum organizador pedindo para te autenticarem. Dessa forma você poderá ter acesso aos outros canais e conteúdos :)`);
    })

    // client.on('message', msg => {
    //     const msgContent = msg.content.toLowerCase()
        
    //     if (msg.channel.id === process.env.CHANNEL_BATEPAPO_ID) 
    //         if (msg.author !== client.user)
    //             if (msgContent.indexOf('bemvindo!!!!') != -1 || msgContent.indexOf('bem-vindo!!!!') != -1 || msgContent.indexOf('bem vindo!!!!') != -1) {
    //                 const channel = client.channels.cache.find(c => c.id === process.env.CHANNEL_BATEPAPO_ID)
    //                 channel.send('Bem-vindo!  ✨ 🎉🎉🎉')
    //             }
    })
}