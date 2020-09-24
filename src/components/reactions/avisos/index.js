module.exports = client => client.on('message', msg => {
    msg.channel.id == process.env.CHANNEL_AVISOS_ID 
        && msg.author !== client.user
            && msg.attachments.size
                && msg.react('✅'); msg.react('✅'); msg.react('💯'); msg.react('💖')
})