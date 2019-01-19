const discord = require('discord.js')
const bot = new discord.Client()
const TOKEN = process.env.TOKEN
bot.login(TOKEN)