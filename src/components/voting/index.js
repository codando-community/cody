module.exports = client => client.on('message', msg => {
    const isCodyReference = msg.mentions.users.filter(u => u === client.user).size === 1
    
    if (msg.author !== client.user)
        if (msg.content.toLowerCase().indexOf('test') != -1)
            if (isCodyReference)    
                msg.channel.send('Manda bala!')
})