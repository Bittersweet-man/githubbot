const xp = require("../../xp.json")
const Commando = require('discord.js-commando');
const discord = require("discord.js")
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
        let nxtLvlXp = (curLvl * 200) * 1.2;
        let difference = nxtLvlXp - curXp;
        let levelEmbed = new discord.RichEmbed()
            .setTitle(message.author.username)
            .setColor("#ff00ff")
            .addField("Level", curLvl, true)
            .addField("XP", curXp, true)
            .setFooter(`${difference} XP until level up`, message.author.displayAvatarURL)
        message.channel.send({
            embed: levelEmbed
        })
        //message.channel.send(`You are level ${curLvl} and have ${curXp} experience.`)
        xp[message.author.id].xp = xp[message.author.id].xp + 200
        fs.writeFile("../xp.json", JSON.stringify(xp), (err) => {
            if (err) {
                console.log(err);
            }
        })
        //{ Error: EROFS: read-only file system, open '../xp.json' errno: -30, code: 'EROFS', syscall: 'open', path: '../xp.json' }
    }

}

module.exports = XPCommand;