const Commando = require('discord.js-commando');
const ytdl = require('ytdl-core')

class PlayCommand extends Commando.Command
{
    constructor(client,)
        {
        super(client,{
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Look at your reflection in a mirror!'
        });
    }
        
        
    async run(message, args)
    {
        if (!message.member.voiceChannel) return message.channel.send("You must be in a voice channel!")
        if ( message.guild.me.voiceChannel) return message.channel.send("Sorry, the bot is already in a voice channel.")
        if (!args) return message.channel.send("Sorry, please send a vlid url with the command.")
        let validate = await ytdl.validateURL(args)
        if (!validate) return message.channel.send("That's not a valid url!")
        let info = await ytdl.getInfo(args)
        let connection = await message.member.voiceChannel.join()
        let dispatcher = await connection.playStream(ytdl(args, { filter: 'audioonly' }));
        message.channel.send(`Now playing: ${info.title}`);
    }
}

module.exports = PlayCommand;