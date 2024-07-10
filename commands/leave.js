const {SlashCommandBuilder} = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Makes bot leave"),
    
   
};