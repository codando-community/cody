const express = require("express");
const Discord = require("discord.js");
const { Player } = require("discord-player");
require("dotenv").config();
const app = express();

const Welcome = require("./components/welcome");
const Reactions = require("./components/reactions");
const SendMessage = require("./components/sendMessage");
const ServerLog = require("./components/serverLog");
const Role = require("./components/role");
const Forward = require("./components/sendMessage/forward");
const MusicPlayer = require("./components/musicPlayer");
const VoiceChannel = require("./components/voiceChannel");

const client = new Discord.Client();

client.login(process.env.DS_TOKEN);

client.player = new Player(client);

client.on("ready", () => {
  console.log(
    process.env.SERVER_ID === "720760691677462588"
      ? "Em ambiente de produção"
      : "Em ambiente de desenvolvimento"
  ),
    process.env.SERVER_ID === "720760691677462588"
      ? client.user.setActivity("O bot tá on!", { type: "LISTENING" })
      : client.user.setActivity(
          " na aula, talvez algumas coisas não funcionem!",
          { type: "LISTENING" }
        );

  //types : WATCHING, LISTENING, PLAYING, STREAMING
});
Forward(client);
Welcome(client);
Reactions(client);
SendMessage(client);
ServerLog(client);
Role(client);
MusicPlayer(client);
VoiceChannel(client);

app.listen(8080, () => {});

// Auth(client)
// client.on('ready', () => {
//   client.guilds.cache
//     .find(a => a.id === process.env.SERVER_ID)
//     .channels.cache.map(a => console.
//       log('{name: ', a.name, ', id: ', a.id, '}')
//     )
// });
