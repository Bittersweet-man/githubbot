const search = require('yt-search')
const Commando = require('discord.js-commando');

class SearchCommand extends Commando.Command
{
    constructor(client,)
        {
        super(client,{
            name: 'search',
            group: 'music',
            memberName: 'search',
            description: 'Search for a youtube video!'
        });
    }
        
        
    async run(message, args)
    {

        search(args.join(' '), function(err, res){
            if (err) return message.channel.send("Sorry, I can't do that right now.")
            let videos = res.videos.slice(0, 10)
            let resp = '';
            for(var i in videos){
                resp += `**[${parseInt(i)+1}]:** \'${videos[i].title}\'\n`
            }
            resp += `\n**Choose a number between \'1-${videos.length}\'`
            message.channel.send(resp)
            
            }
        

        )}
}

module.exports = SearchCommand;