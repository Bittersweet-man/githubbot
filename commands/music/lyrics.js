const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const bot = new Commando.Client()
const Lyricist = require('lyricist/node6');
const lyricist = new Lyricist("rK5imylYL1MBHO3pHSahEhdxuPxI7C0Fg3fC-Ms992mbjtpZq3tI3_AJFkzWrO98");
const filter = m => m.content.startsWith('');



class LyricsCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'lyrics',
            group: 'music',
            memberName: 'lyrics',
            description: 'Get lyrics for any song! Start with "!lyrics <artist name>" replacing <artist name> with the artist\'s name. Then send another message specifying which song.'
        });
    }


    async run(message, args) {
        if (!args) {
            message.channel.send('Please specify an artist!')
            return;
        } else {
            const song = await lyricist.song(args, {
                fetchLyrics: true
            }).then(song => message.channel.send(song.lyrics));



        }
    }
}


module.exports = LyricsCommand;