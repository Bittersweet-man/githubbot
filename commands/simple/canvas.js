const Commando = require('discord.js-commando');

class CanvasCommand extends Commando.Command
{
    constructor(client,)
        {
        super(client,{
            name: 'canvas',
            group: 'simple',
            memberName: 'canvas',
            description: 'Just a test for canvas'
        });
    }
        
        
    async run(message, args)
    {
        const { Canvas } = require('canvas-constructor');
 
        var picture = new Canvas(300, 300)
            .setColor('#AEFD54')
            .addRect(5, 5, 290, 290)
            .setColor('#FFAE23')
            .setTextFont('28px Impact')
            .addText('Hello World!', 130, 150)
            .toBuffer();
            message.channel.send(picture)
    }
}

module.exports = CanvasCommand;