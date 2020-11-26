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
const Read = require("./api/read")
const client = new Discord.Client();

const config = require("./config.json");
const activeServer = config.prod;

client.login(process.env.DS_TOKEN);

client.on("ready", () => {
  config.prod.server_id === activeServer.server_id
    ? client.user.setActivity("instagram.com/codando.community", { type: "WATCHING" })
      && console.log("Em ambiente de produção!")

    : client.user.setActivity("flow.page/codando.community",{ type: "WATCHING" })
      && console.log("Em ambiente de desenvolvimento");
});

Avisos(client, activeServer);
Meme(client, activeServer);
Goodbye(client, activeServer);
UserAndRoles(client, activeServer);
Welcome(client, activeServer);
RoleManager(client, activeServer);
Forward(client, activeServer);
VoiceAudioManager(client, activeServer);
Read(client, activeServer)
app.listen(8080, () => {});