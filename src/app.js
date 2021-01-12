/**
 *
 */
require('dotenv').config();

const Discord = require('discord.js');
const express = require('express');
const Express = express();

const GuildMemberAdd = require('./events/guildMemberAdd')
const GuildMemberRemove = require('./events/guildMemberRemove')
const Message = require('./events/message')
const Ready = require('./events/ready')

const client = new Discord.Client();
const config = require('./config.json');
const activeServer = config.prod;
client.login(process.env.DS_TOKEN);

Ready(client, activeServer, config)
Message(client, activeServer)
GuildMemberAdd(client, activeServer)
GuildMemberRemove(client, activeServer)

Express.listen(8080, () => {});