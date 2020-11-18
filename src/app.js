require("dotenv").config();

const express = require("express");
const Discord = require("discord.js");
const app = express();

const Avisos = require("./components/reactions/avisos");
const Meme = require("./components/reactions/meme");

const Forward = require("./components/sendMessage/forward");
const Goodbye = require("./components/sendMessage/goodbye");
const UserAndRoles = require("./components/sendMessage/userAndRoles");
const Welcome = require("./components/sendMessage/welcome");

const RoleManager = require("./components/role/RoleManager");

const VoiceAudioManager = require("./components/Audio");

const client = new Discord.Client();
const instance = require("./api/instance")

client.login(process.env.DS_TOKEN);

client.on("ready", () => {
    process.env.SERVER_ID === "720760691677462588"
      ? client.user.setActivity("O bot tá on!", { type: "LISTENING" }) && console.log('Em ambiente de produção!')
      : client.user.setActivity(
          " na aula, talvez algumas coisas não funcionem!",
          { type: "LISTENING" }
        ) && console.log('Em ambiente de desenvolvimento')

  //types : WATCHING, LISTENING, PLAYING, STREAMING
})

// instance.select()
Avisos(client)
Meme(client)
Goodbye(client)
UserAndRoles(client)
Welcome(client)
RoleManager(client)
Forward(client)
VoiceAudioManager(client)

app.listen(8080, () => {});

// Auth(client)
// client.on('ready', () => {
//   client.guilds.cache
//     .find(a => a.id === process.env.SERVER_ID)
//     .channels.cache.map(a => console.
//       log('{name: ', a.name, ', id: ', a.id, '}')
//     )
// });
