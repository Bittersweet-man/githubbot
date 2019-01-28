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


    async run(message, args, ops) {
        if (!message.member.voiceChannel) return message.channel.send("You must be in a voice channel!")
        if (!args) return message.channel.send("Sorry, please send a vlid url with the command.")
        let validate = await ytdl.validateURL(args)
        if (!validate) return message.channel.send("That's not a valid url!")

        let info = await ytdl.getInfo(args[0])
        let data = ops.active.get(message.guild.id) || {};
        if (!data.connection) data.connection = await message.member.voiceChannel.join()
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: args,
            announceChannel: message.channel.id
        });

        if (!data.dispatcher) play(bot, data, ops);
        else {
            message.channel.send(`Added to queue: ${info.title} | Requested By: ${message.author.id}`)
        }
        ops.active.set(message.guild.id, data)






        async function play(data, bot, ops) {
            bot.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle} | Requested By: ${data.queue[0].requester}`)
            data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {
                filter: 'audioonly'
            }));
            data.dispatcher.guildID = data.guildID

            data.dispatcher.once('finish', function () {
                finish(this, ops, bot)
            })
        }

        function finish(bot, dispatcher, ops) {
            let fetched = ops.active.get(dispatcher.guildID)
            fetched.queue.shift();
            if (fetched.queue.length > 0) {
                ops.active.set(dispatcher.guildID, fetched)
                play(bot, ops, fetched);
            } else {
                ops.active.delete(dispatcher.guildID)
                let vc = bot.guilds.get(discpatcher.guild.id).me.voiceChannel;
                if (vc) vc.leave()

            }
        }
    }
}

module.exports = PlayCommand;