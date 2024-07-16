const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Replies with bot cmds"),
    
   
};