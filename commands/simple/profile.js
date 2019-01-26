const Commando = require('discord.js-commando');
const discord = require('discord.js')
var dl = require('discord-leveling')

class EXPCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'profile',
            group: 'simple',
            memberName: 'profile',
            description: 'Get your current profile! Exp and level!'
        });
    }


    async run(message, args) {
        var fs = require('fs');
        var fileName = './coins.1.json';
        var file = require(fileName);
            if(!file[message.author.id]){
                message.reply('You have no xp!')
                return;
            }
            var xp = file[message.author.id].xp
            var words = JSON.stringify(xp)
            message.channel.send(words)

      
    }
};

module.exports = EXPCommand