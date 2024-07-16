const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Loads songs from YouTube')
        .addSubcommand(subcommand =>
            subcommand
                .setName('song')
                .setDescription('Plays a single song from a YouTube URL')
                .addStringOption(option => option.setName('url').setDescription('The song\'s URL').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playlist')
                .setDescription('Plays a playlist from a YouTube URL')
                .addStringOption(option => option.setName('url').setDescription('The playlist\'s URL').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('search')
                .setDescription('Searches for songs based on keywords')
                .addStringOption(option => option.setName('searchterms').setDescription('The keywords').setRequired(true))
        ),

    execute: async ({ client, interaction }) => {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply("You must be in a VC to use this command");
        }

        console.log(`Voice Channel ID: ${voiceChannel.id}`);

        const queue = await client.player.nodes.create(interaction.guild);
      
        if (!queue.connection) await queue.connect(voiceChannel.id);

        let embed = new EmbedBuilder();

        if (interaction.options.getSubcommand() === 'song') {
            let url = interaction.options.getString('url');
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });

            if (result.tracks.length === 0) {
                return interaction.reply("No results");
            }

            const song = result.tracks[0];
            await queue.addTrack(song);

            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` });

        } else if (interaction.options.getSubcommand() === 'playlist') {
            let url = interaction.options.getString('url');
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });

            if (result.tracks.length === 0) {
                return interaction.reply("No results");
            }

            const playlist = result.tracks[0];
            await queue.addTracks(result.tracks);

            embed
                .setDescription(`**[${result.tracks.length} songs from ${playlist.title}](${playlist.url})** have been added to the Queue`)
                .setThumbnail(playlist.thumbnail);

        } else if (interaction.options.getSubcommand() === 'search') {
            let searchTerms = interaction.options.getString('searchterms');
            const result = await client.player.search(searchTerms, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            if (result.tracks.length === 0) {
                return interaction.reply("No results");
            }

            const song = result.tracks[0];
            await queue.addTrack(song);

            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` });
        }

        try {
            if (!queue.playing) await queue.play(queue.tracks.store, queue.options);
            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error occurred while trying to play queue:', error);
        }        

    }
};
