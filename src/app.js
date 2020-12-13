require("dotenv").config();

const express = require("express");
const Discord = require("discord.js");
const app = express();

const Avisos = require("./events/reactions/avisos");
const Meme = require("./events/reactions/meme");

const Forward = require("./events/sendMessage/forward");
const Goodbye = require("./events/sendMessage/goodbye");
const UserAndRoles = require("./events/sendMessage/userAndRoles");
const Welcome = require("./events/sendMessage/welcome");

const RoleManager = require("./events/role/RoleManager");

const VoiceAudioManager = require("./events/Audio");
const RoleStatus = require("./events/serverStatus/roleStatus")
const Read = require("./events/message/sendMessage/read")
const client = new Discord.Client();

const config = require("./config.json");
const activeServer = config.prod;

client.login(process.env.DS_TOKEN);

client.on("ready", () => {
  config.prod.server_id === activeServer.server_id
    ? client.user.setActivity("instagram.com/codando.community", { type: "WATCHING" })
      && console.log("Em ambiente de produção!.")

    : client.user.setActivity("flow.page/codando.community",{ type: "WATCHING" })
      && console.log("Em ambiente de desenvolvimento.");
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
RoleStatus(client, activeServer)
app.listen(8080, () => {});