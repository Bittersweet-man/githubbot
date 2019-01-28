const Commando = require('discord.js-commando');
const ytdl = require('ytdl-core')
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
        if (!message.member.voiceChannel) return message.channel.send("You must be in a voice channel!")
        if (!args) return message.channel.send("Sorry, please send a valid url with the command.")
       let info = await ytdl.getInfo(args[0], (err, info) => {
            if(err) return message.channel.sendMessage('Invalid YouTube Link: ' + err);
       })
        let data = active.get(message.guild.id) || {};
        if (!data.connection) data.connection = await message.member.voiceChannel.join()
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: args[0],
            announceChannel: message.channel.id
        });

        if (!data.dispatcher) play(bot, data);
        else {
            message.channel.send(`Added to queue: ${info.title} | Requested By: ${message.author.id}`)
        }
        active.set(message.guild.id, data)







        async function play(data, bot) {
            bot.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle} | Requested By: ${data.queue[0].requester}`)
            data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {
                filter: 'audioonly'
            }));
            data.dispatcher.guildID = data.guildID

            data.dispatcher.once('end', function () {
                end(this, bot)
            })
        }

        function end(bot, dispatcher) {
            let fetched = active.get(dispatcher.guildID)
            fetched.queue.shift();
            if (fetched.queue.length > 0) {
                active.set(dispatcher.guildID, fetched)
                play(bot, fetched);
            } else {
                active.delete(dispatcher.guildID)
                let vc = bot.guilds.get(dispatcher.guild.id).me.voiceChannel;
                if (vc) vc.leave()

            }
        }
    }
}

module.exports = PlayCommand;