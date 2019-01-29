
const Commando = require('discord.js-commando');
const YouTube = require("discord-youtube-api"); 
const youtube = new YouTube("AIzaSyBaOogg5vrTJtS2SLoYgiI9qFxL5kar3O8");


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
        if(!args){
            message.channel.send("Please supply a video you want!")
            return;
        }
        const video3 = await youtube.searchVideos("big poppa biggie smalls");
        console.log(video3)
        message.channel.send(video3.url)

    }
}

module.exports = SearchCommand;