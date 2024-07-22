const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes song"),
    execute: async ({ client, interaction }) => {
        const queue = client.player.nodes.get(interaction.guild);
        
        if (!queue) {
            await interaction.reply("There is no song playing.");
            return;
        }
        const currentTrack = queue.currentTrack;

        const embed = new EmbedBuilder()
        .setDescription(`**Resumed: [${currentTrack.title}](${currentTrack.url})** `)
        .setThumbnail(currentTrack.thumbnail);

        queue.node.resume();

        await interaction.reply({embeds:[embed]});

    }
    
};