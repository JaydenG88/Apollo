const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cmds")
        .setDescription("Replies with bot cmds"),
    
    async execute({ client, interaction }) {
        
        let commandsList = "My commands are:\n================\n";

        interaction.client.commands.forEach(command => {
            commandsList += `**/${command.data.name}:** ${command.data.description}\n`;
        });
        
        const embed = new EmbedBuilder()
            .setDescription(commandsList);

        await interaction.reply({embeds:[embed]});
    }
};