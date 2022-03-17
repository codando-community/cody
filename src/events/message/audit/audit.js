const Discord = require('discord.js');
const auditList = require('./audit.json');

/**
 *
 * @param {Discord.Client} client
 * @param {object} activeServer
 * @param {string} responseMessage
 */
function sendMessage(client, activeServer, responseMessage) {
    const GUILD = client.guilds.cache.find(g => g.id === activeServer.server_id)
    const moderationChannel = GUILD.channels.cache.find(channel => channel.id === activeServer.text_channel.moderacao)
    moderationChannel && moderationChannel.send(responseMessage)
}

/**
 *
 * @param {Discord.Client} client
 * @param {object} activeServer
 * @param {Discord.Message} msg
 */
module.exports = (client, activeServer, msg) => {
    let isBannedMessage = auditList.find(audit => msg.content.includes(audit.request));

    if (isBannedMessage) {
        msg.delete()
        sendMessage(client, activeServer, isBannedMessage.response)
    }
};