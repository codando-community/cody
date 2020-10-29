const express = require('express')
const Discord = require('discord.js')
const Welcome = require('./components/welcome')
const Reactions = require('./components/reactions')
const SendMessage = require('./components/sendMessage')
const ServerLog = require('./components/serverLog')
const Role = require('./components/role')
require('dotenv').config()
const app = express()

const client = new Discord.Client()

client.login(process.env.DS_TOKEN)
client.on('ready', () => console.log('^^ Ahoy!'))

Welcome(client)
Reactions(client)
SendMessage(client)
ServerLog(client)
Role(client)

app.listen(8080, () => {})

// Auth(client)
// client.on('ready', newMember => {
//     client.guilds.cache.find(a => a.id === process.env.SERVER_ID).channels.cache.map(a => console.log("{name: '", a.name, "', id: '", a.id,"'}"))
// });