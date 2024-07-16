const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Player } = require("discord-player"); 
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");
const { YouTubeExtractor } = require('@discord-player/extractor');

require("dotenv").config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
    intents :
     [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMessages  
     ]});

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1<< 25
    }
});

client.player.extractors.loadDefault(); 


const commands = [];
client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of commandFiles) {
    
    const filePath = `./commands/${file}`;
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());

}

client.on("ready", async () => {
    const guildIDs = client.guilds.cache.map(guild => guild.id);
    const rest = new REST({ version: "9" }).setToken(TOKEN);

    for (const guildID of guildIDs) {

        try {
            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, guildID),
                { body: commands }
            );
            console.log(`Successfully updated commands for guild ${guildID}`);
        } catch (error) {
            console.error(error);
        }
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute({client, interaction});
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "Error executing command" });
    }
});

client.login(TOKEN);
