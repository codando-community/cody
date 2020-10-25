module.exports = client => client.on('message', msg => {
    const isCodyReference = msg.mentions.users.filter(u => u === client.user).size === 1
    
    const isDiretoriaMember = (msgAuthor) => {
        let diretoriaUserList = []

        client.guilds.cache.map(c => 
            c.roles.cache.map(role => 
                role.id === process.env.ROLE_DIRETORIA_ID
                    && role.members.map(m => diretoriaUserList.push(m.user))))
        
        return diretoriaUserList.filter(m => m === msgAuthor)[0]
    }
    
    if (msg.author !== client.user)
        if (isCodyReference) {
            if (msg.content.toLowerCase().indexOf('server log') != -1) {
                isDiretoriaMember(msg.author)
                    && client.guilds.cache.map(c => c.roles.cache.map(role =>
                        msg.reply(`cargo: ${role.name}, members: ${role.members.size}`)))
            }
        } 
})