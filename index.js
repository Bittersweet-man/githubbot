
const Commando = require('discord.js-commando');
const fs = require('fs')
const active = new Map();
const TOKEN = process.env.TOKEN;
const bot = new Commando.Client({
    commandPrefix: "?",
      owner: "413754421365964800",
    owner: "462709446121095169"

})
const discord = require('discord.js')

//bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('animals', 'Animals');

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login(TOKEN);

global.servers = {};
var playQueue = [];

bot.on('ready', () => {
    console.log("Ready");
    const channel = bot.channels.get('538707114781179904')
    channel.send("I am online!")
    bot.user.setActivity("Type ?help", {
        type: 'PLAYING'
    })
    console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on("guildMemberAdd", function (member) {
    if (member.guild.id == 465707591910162432) {
        member.send("Hello! Welcome to sylveon land, here we meme the crap out of our existence! Read #welcome-rules before typing away!");
        var channel = bot.channels.get('538814550506733578')
        var guild = 465707591910162432
        var rules = bot.channels.get('538813283139059732')
        var accept = bot.channels.get('538818808807292940')
        var thumbnail = member.id.avatarURL
        let welcome = new discord.RichEmbed()
            .setTitle("Welcome!")
            .addField("New Member", "New member " + member + " has joined! Give then a warm welcome!", true)
            .addField("Rules", "Make sure to read " + rules + " and do \'accept\' in" + accept + " to get access to the server!", true)
            .setDescription("You're user " + member.guild.memberCount)
            .setColor('RANDOM')
            .setImage(member.user.avatarURL)
            .setFooter("Welcome to the server!")

        channel.send(welcome);
    }
    if (member.guild.id == 510974262769614918) {
        var channel = bot.channels.get('510974262769614921')
        channel.send('someone joined kk')
    }

});

bot.on("guildMemberRemove", function (member) {
        if (member.guild.id == 465707591910162432) {
            var channel = bot.channels.get('538814550506733578')
            var guild = 465707591910162432
            channel.send('**I\'m sorry that ' + member.displayName + " has left us. oof.**")
        }
    }

);






bot.on('message', function (message) {

  if(message.content == "reboot"){
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send("You don't have permissions to use this command!");
        return;
    }
    message.channel.send('Resetting...')
    .then(msg => bot.destroy())
    .then(() => bot.login(process.env.TOKEN));
  }
  if(message.content == "shutdown"){
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send("You don't have permissions to use this command!");
        return;
    }
    message.channel.send('Shutting down...')
    .then(msg => bot.destroy())
  }
    if (message.content.toLowerCase() == "accept") {
        message.reply('You have been accepted to the Sylveon Squad!')
        var role = message.guild.roles.find(role => role.name === "newcomer")
        message.member.addRole(role)
    }
    if (message.content == '$shadow') {
        let myRole = message.guild.roles.get("515653899839864843");
        message.member.addRole(myRole)
        message.channel.send('welcome to the shadows')
    }
    if (message.content.includes("nigga")) {
        message.delete();
        message.author.send("Please don't use the word \"Nigga\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("Nigga")) {
        message.delete();
        message.author.send("Please don't use the word \"Nigga\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("nigger")) {
        message.delete();
        message.author.send("Please don't use the word \"Nigger\", or any slurs. This is just a warning, next time will result in a ban.")

    }
    if (message.content.includes("Nigger")) {
        message.delete();
        message.author.send("Please don't use the word \"Nigger\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("Fag")) {
        message.delete();
        message.author.send("Please don't use the word \"Fag\", or any slurs. This is just a warning, next time will result in a ban.")

    }
    if (message.content.includes("fag")) {
        message.delete();
        message.author.send("Please don't use the word \"Fag\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("faggot")) {
        message.delete();
        message.author.send("Please don't use the word \"Faggot\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("Faggot")) {
        message.delete();
        message.author.send("Please don't use the word \"Faggot\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("retard")) {
        message.delete();
        message.author.send("Please don't use the word \"Retard\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("Retard")) {
        message.delete();
        message.author.send("Please don't use the word \"Retard\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("dike")) {
        message.delete();
        message.author.send("Please don't use the word \"Dike\", or any slurs. This is just a warning, next time will result in a ban.")
    }
    if (message.content.includes("Dike")) {
        message.delete();
        message.author.send("Please don't use the word \"Dike\", or any slurs. This is just a warning, next time will result in a ban.")
    }

})
