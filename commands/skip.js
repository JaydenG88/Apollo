const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips song"),
    execute: async ({client, interaction}) => {
        
        const queue = client.player.queues.create(interaction.guild)(interaction.guild);
        console.log(queue);

    }
    
};