const Discord = require('discord.js')
const Welcome = require('./components/welcome')
const Reactions = require('./components/reactions')
require('dotenv').config()

const client = new Discord.Client()

client.login(process.env.DS_TOKEN)
client.on('ready', () => console.log('Ahoy!'))

Welcome(client)
Reactions(client)


// Auth(client)
// client.on('ready', newMember => {
//     client.guilds.cache.find(a => a.id === process.env.SERVER_ID).channels.cache.map(a => console.log("{name: '", a.name, "', id: '", a.id,"'}"))
// });