const express = require('express')
const Discord = require('discord.js')
const Welcome = require('./components/welcome')
const Reactions = require('./components/reactions')
const SendMessage = require('./components/sendMessage')
const Test = require('./components/test')
require('dotenv').config()

const client = new Discord.Client()

client.login(process.env.DS_TOKEN)
client.on('ready', () => {
    console.log('Ahoy! to on na IBM!')
})

Welcome(client)
Reactions(client)
SendMessage(client)
Test(client)

express().set('port', process.env.PORT || 8080)
express().listen(express().get('port'));

// Auth(client)
// client.on('ready', newMember => {
//     client.guilds.cache.find(a => a.id === process.env.SERVER_ID).channels.cache.map(a => console.log("{name: '", a.name, "', id: '", a.id,"'}"))
// });