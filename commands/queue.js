const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Displays queue of music")
        .addNumberOption((option) => option.setName("page").setDescription("Page number of the queue").setMinValue(1)),

        execute: async ({ client, interaction }) => {
            const queue = client.player.nodes.get(interaction.guild);

            if(!queue) {
                console.log(!queue);
                return await interaction.reply("There are no songs playing.");
                
            }

            const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
            const page = (interaction.options.getInteger("page") || 1) - 1;

            if (page > totalPages) {
                return await interaction.editReply(`Invalid Page. There are only a total of ${totalPages} pages of songs.`);

            }

            const queueString = queue.tracks.store.slice(page * 10, page * 10 + 10).map((song, i) => {
                return `${page * 10 + i + 1}. \`[${song.duration}]\` ${song.title} -- <**@${song.requestedBy.username}**`;
            }).join("\n");

            const currentTrack =  queue.currentTrack;

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`**Currently playing**\n` + 
                        (currentTrack ? `\`[${currentTrack.duration}]\` ${currentTrack.title} -- <**@${currentTrack.requestedBy.username}**` : "none.") + 
                    `\n\n**Queue**\n${queueString}`)
                    .setFooter({text: `Page ${page + 1} out of ${totalPages}`})
                    .setThumbnail(currentTrack.thumbnail)
                ]
            });
        }

   
};