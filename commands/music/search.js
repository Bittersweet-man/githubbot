const YouTube = require('simple-youtube-api')
const Commando = require('discord.js-commando');
const youtube = new YouTube('AIzaSyBPn0OXaz3_e0VaKs - ZGHEJ5eP15 - GrVoE');
class SearchCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'search',
            group: 'music',
            memberName: 'search',
            description: 'Search for a youtube video!'
        });
    }


    async run(message, args) {
        const video3 = await youtube.searchVideos("twenty one pilots");
        message.channel.send(video3.url)

    }
}

module.exports = SearchCommand;