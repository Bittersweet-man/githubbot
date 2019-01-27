
const Commando = require('discord.js-commando');
const YouTube = require("discord-youtube-api"); 
const youtube = new YouTube("AIzaSyA1K-AoOn0lV5lh9f16vbC5ikFhNWGlBbw");


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
        const video3 = await youtube.getVideoByID("eJnQBXmZ7Ek");
console.log(video3)
        message.channel.send(video3)

    }
}

module.exports = SearchCommand;