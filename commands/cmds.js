const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cmds")
        .setDescription("Replies with bot cmds"),
    
    async execute(interaction) {
        let commandsList = "My commands are:\n================\n";
        interaction.client.commands.forEach(command => {
            commandsList += `**/${command.data.name}:** ${command.data.description}\n`;
        });
        commandsList += "================\n";
        
        await interaction.reply(commandsList);
    }
};