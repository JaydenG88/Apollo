const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses song"),
    execute: async ({client, interaction}) => {
        
        const queue = client.player.nodes.get(interaction.guild);
        
        if (!queue) {
            await interaction.reply("There is no song playing.");
            return;
        }

        const currentTrack = queue.currentTrack;

        const embed = new EmbedBuilder()
        .setDescription(`**Paused: [${currentTrack.title}](${currentTrack.url})** `)
        .setThumbnail(currentTrack.thumbnail);
        
        queue.node.pause();

        await interaction.reply({embeds:[embed]});

    }
    
};