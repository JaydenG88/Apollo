const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Makes bot leave"),
    
   execute: async ({client, interaction}) => {
        const queue = client.player.nodes.get(interaction.guild);

        if (!queue || !queue.connection) {
            return await interaction.reply("Bot is not in a voice channel.")
        }

        queue.connection.disconnect();
        return await interaction.reply("Bot has been disconnected");


   }
};