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

const instance = require("./api/instance");

const client = new Discord.Client();

const config = require("./config.json");
const activeServer = config.dev;

client.login(process.env.DS_TOKEN);

client.on("ready", () => {
  config.prod.server_id === activeServer.server_id
    ? client.user.setActivity("O bot tá on!", { type: "LISTENING" }) &&
      console.log("Em ambiente de produção!")
    : client.user.setActivity(
        " na aula, talvez algumas coisas não funcionem!",
        { type: "LISTENING" }
      ) && console.log("Em ambiente de desenvolvimento");

  //types : WATCHING, LISTENING, PLAYING, STREAMING
});

// instance.create();

// var example;

// instance.select({ name: "TESTE" }).then((result) => {
//   example = result[0];
//   //console.log("result: ", result);
//   console.log("Exemplo: ", example);
//   example.name = "one piece";
//   console.log("depois: ", example);
//   //instance.updateDocument(example).then();
// });

//console.log(example)
// instance.select({ name: "one piece" }).then((result) => {
//   console.log(result[0])
//   instance.deleteDocument(result[0]);

// })


Avisos(client, activeServer);
Meme(client, activeServer);
Goodbye(client, activeServer);
UserAndRoles(client, activeServer);
Welcome(client, activeServer);
RoleManager(client, activeServer);
Forward(client, activeServer);
VoiceAudioManager(client, activeServer);

app.listen(8080, () => {});

// Auth(client)
// client.on('ready', () => {
//   client.guilds.cache
//     .find(a => a.id === activeServer.server_id)
//     .channels.cache.map(a => console.
//       log('"%s": "%s",', a.name.toLowerCase(), a.id)
//     )
// });
