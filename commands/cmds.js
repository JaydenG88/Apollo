const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cmds")
        .setDescription("Replies with bot cmds"),
    
    async execute(interaction) {
        await interaction.reply("Commands are:");
    }
};