const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');
const { Player } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes song"),
    execute: async ({client, interaction}) => {
        
        const queue = client.player.nodes.get(interaction.guild);
        
        if (!queue) {
            await interaction.reply("There is no song playing.");
            return;
        }


        queue.node.resume();

        await interaction.reply("resumed")

    }
    
};