const Discord = require('discord.js')
// const config = require('../data/botconfig.json')
const Welcome = require('./welcome/')
// const Auth = require("./auth/");
require('dotenv').config();

const client = new Discord.Client()

client.login(process.env.DS_TOKEN)
client.on('ready', (a) => console.log("Ahoy!" +a))

Welcome(client)
// Auth(client)