const Commando = require('discord.js-commando');

class LeaveChannelCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Leaves the voice channel of the commander'
        });
    }


    async run(message, args) {
        if (!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.")
        if (!message.guild.me.voiceChannel) return message.channel.send("Sorry, I'm not in a voice channel!")
        if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.channel.send("Sorry, we aren't in the same voice channel!")
        message.guild.me.voiceChannel.leave()
        message.channel.send("Leaving...")

    }


}

module.exports = LeaveChannelCommand;