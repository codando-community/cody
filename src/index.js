const Discord = require('discord.js')
const config = require('../data/botconfig.json')
const Welcome = require('./welcome/')
const Auth = require("./auth/");

const client = new Discord.Client()

client.login(config.token)
client.on('ready', (a) => console.log("Ahoy!" +a))

Welcome(client)
// Auth(client)