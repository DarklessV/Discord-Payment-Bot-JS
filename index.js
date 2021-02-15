const { Client, Collection, MessageEmbed } = require('discord.js');
const { loadCommands, sendCommand } = require('./helpers/commandHandler');
const loadMeta = require('./helpers/botMeta');
const bot = new Client();
loadMeta({ Collection: Collection }, bot);

bot.once('ready', () => {
    console.log('I\'m online!');
    loadCommands(bot);
});

bot.on('message', message => {
    sendCommand(bot, message);
})

bot.login(bot.config.Bot.token);