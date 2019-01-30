const Commando = require('discord.js-commando');
const YTDL = require('ytdl-core')
const discord = require('discord.js')
const bot = new discord.Client()




class PlayCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Look at your reflection in a mirror!'
        });
    }


    async run(message, args) {
        var servers = {};
        if (!args[1]) {
message.channel.send("Please provide a link")
return
        }
        if(!message.member.voiceChannel){
message.channel.send("You must be in a VC")
return
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }
        function Play (connection, message){
            var server = servers[message.guild.id]
            server.dipatcher = connection.playStream(YTDL(server.queue[0], {
                filter: "audioonly"
            }));
        
            server.queue.shift();
            server.dipatcher.on("end", function () {
            if(server.queue[0]) play(connection, message)
            else connection.disconnect
        })
        }
        var server = servers[message.guild.id]
        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            server.queue.push(args)
            Play(connection, message);
        }

        )}
}

module.exports = PlayCommand;