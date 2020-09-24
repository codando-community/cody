module.exports = client => client.on('message', msg => {
    msg.channel.id == process.env.CHANNEL_MEMES_ID 
        && msg.author !== client.user
            && msg.attachments.size
                && msg.react('😂')
})