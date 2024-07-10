const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Replies with information about bot's use"),
    
    async execute(interaction) {
        await interaction.reply("Hello! I am Jamithy, a music bot that takes youtube links!");
    }
};