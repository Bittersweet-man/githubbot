const xp = require("../../xp.json")
const Commando = require('discord.js-commando');
let fs = require("fs")

class XPCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'xp',
            group: 'simple',
            memberName: 'xp',
            description: 'Gain XP!'
        });
    }


    async run(message, args) {
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }
        let curXp = xp[message.author.id].xp;
        let curLvl = xp[message.author.id].level;
        message.channel.send(`You are level ${curLvl} and have ${curXp} experience.`)
        fs.writeFile("../xp.json", JSON.stringify(xp), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }

}

module.exports = XPCommand;