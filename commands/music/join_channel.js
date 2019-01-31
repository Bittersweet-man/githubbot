const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');
const YouTube = require("discord-youtube-api"); 
const youtube = new YouTube(process.env.YouTubeAPI);
const discord = require('discord.js');

function Play(connection, message) {
    var server = servers[message.guild.id];
    server.dipatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly"
    }));
    server.queue.shift();
    server.dipatcher.on("end", function () {
        if (server.queue[0]) {
            Play(connection, message);
        } else {
            connection.disconnect();
        }
    });
}

class JoinChannelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Joins the voice channel the commander is currently in. Add whatever song you want to the command, and listen to it!' });
    }

    async run(message, args) {
        const video3 = await youtube.searchVideos(args);
        //const channel = await youtube2.getChannel(video3)
        if (message.member.voiceChannel) {
            if (!message.guild.voiceConnection) {
                if (!servers[message.guild.id]) {
                    servers[message.guild.id] = {
                        queue: []
                    }
                }
                message.member.voiceChannel.join()
                    .then(connection => {
                        var server = servers[message.guild.id];
                        message.react("👍");


                        var mEmbed = new discord.RichEmbed()
                          .setTitle('New Song!')
                        .addField('Song Length', video3.length)
                        .addField('Requested by', message.author)
                        .setDescription(video3.title)
                        .setFooter("A song was requested!")
                        .setURL(video3.url)
                        .setTimestamp()
                        .setColor(0xff0000)
                        .setThumbnail(video3.thumbnail)

                       message.channel.send({
                        embed: mEmbed
                        })

                        server.queue.push(video3.url);
                        Play(connection, message);
                    })
            }
        } else {
            message.reply("You must be in a Voice Channel to summon me!");
        }
    }
}

module.exports = JoinChannelCommand;