const Commando = require('discord.js-commando');
var servers = {};
const YTDL = require('ytdl-core');
function play(connection, message){
var server = servers[message.guild.id]
server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}))
server.queue.shift();
server.dispatcher.on('end', function(){
    if(server.queue[0]){
        play(connection, message)

    }
    else connection.disconnect()
})
}

class PlayCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Play any song!'
        });
    }


    async run(message, args) {
        if (!args) {
            message.channel.send("Please provide a link!")
            return;
        }
        if (!message.member.voiceChannel) {
            message.channel.send("You must be in a voice channel!")
            return;
        }
        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }
        var server = servers[message.guild.id]
        if (!message.guild.voiceChannel) message.member.voiceChannel.join().then(function (connection) {
            play(connection, message)
        })
    }

}

module.exports = PlayCommand;