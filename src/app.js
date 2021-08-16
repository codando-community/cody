require('dotenv').config();
const Discord = require('discord.js');
const express = require('express');
const Express = express();

// Import events
const GuildMemberAdd = require('./events/guildMemberAdd')
const GuildMemberRemove = require('./events/guildMemberRemove')
const Message = require('./events/message')
const Ready = require('./events/ready');

// Client config
const client = new Discord.Client();

client.login(process.env.DS_TOKEN);

// Event call
Ready(client)
Message(client)
GuildMemberAdd(client)
GuildMemberRemove(client)

Express.listen(8080);