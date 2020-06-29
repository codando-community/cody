const Discord = require('discord.js')
const config = require('./config.json')
const Welcome = require('./welcome/')
const Auth = require("./auth/");

const client = new Discord.Client()

client.login(config.token)
client.on('ready', () => console.log("Ahoy!"))

client.on('message', msg => {
    if (msg.author == client.user) {
        return
    } else {
        Welcome(client)
        Auth(client)
    }
})