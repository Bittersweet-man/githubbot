const YouTube = require('simple-youtube-api')
const Commando = require('discord.js-commando');
const youtube = new YouTube(AIzaSyBPn0OXaz3_e0VaKs - ZGHEJ5eP15 - GrVoE);
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
        try {
            var video = await youtube.getVideo(url)

        } catch (error) {
            try {
var videos = await youtube.searchVideos(url, 1)
var video2 = await youtube.getVideoByID(videos[0].id)
message.channel.send(video2)
            } catch (error) {
return message.channel.send("there was an oopsie")
            }
        }


    }
}

module.exports = SearchCommand;