const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player } = require("discord-player"); 
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");
const { getDefaultHighWaterMark } = require("node:stream");

require("dotenv").config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
    intents :
     [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMessages  
     ]});

client.login(TOKEN);

client.once("ready", () => {
    console.log("Ready!");
    });
       
client.on("error", console.error);
client.on("warn", console.warn);

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1<< 25
    }
});

const commands = [];
client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of commandFiles) {
    
    const filePath = `./commands/${file}`;
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}
console.log(commands);

