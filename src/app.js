/**
 * Environment mode
 */
const ENV_MODE = 'prod'
module.exports = ENV_MODE

require('dotenv').config();
const Discord = require('discord.js');
const express = require('express');
const Express = express();

// Import events
const GuildMemberAdd = require('./events/guildMemberAdd')
const GuildMemberRemove = require('./events/guildMemberRemove')
const Message = require('./events/message')
const Ready = require('./events/ready')

// Client config
const client = new Discord.Client();
const config = require('./config.json');
const activeServer = config[ENV_MODE];
client.login(process.env.DS_TOKEN);

// Event call
Ready(client, activeServer)
Message(client, activeServer)
GuildMemberAdd(client, activeServer)
GuildMemberRemove(client, activeServer)

Express.listen(8080, () => {});