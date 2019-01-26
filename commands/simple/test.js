
const Commando = require('discord.js-commando');

class FunMirrorCommand extends Commando.Command
{
    constructor(client,)
        {
        super(client,{
            name: 'write',
            group: 'simple',
            memberName: 'write',
            description: 'Look at your reflection in a mirror!'
        });
    }
        
        
    async run(message, args)
    {
        var fs = require('fs');
        var fileName = './coins.1.json';
        var file = require(fileName);
        if(!file[message.author.id]){
            file[message.author.id] = {
                xp: 0
            };
        }
        //let Ucoins = file[message.author.id].coins;
        file[message.author.id].xp = file[message.author.id].xp + 1;
        console.log(message.author.id)
        
        fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(file));
            console.log('writing to ' + fileName);
          });
    }
}

module.exports = FunMirrorCommand;
