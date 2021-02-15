module.exports = (discord, bot) => {
    bot.commands = new discord.Collection();
    bot.config = require('../config.json');
    bot.help = `> **Commands:**\n**Pay:** \`${bot.config.prefix}pay (amount) (product details)\``;
    bot.fs = require('fs');
    bot.paypal = require("paypal-rest-sdk");
    bot.paypal.configure({"mode": bot.config.paypal.mode,"client_id": bot.config.paypal.appID,"client_secret": bot.config.paypal.secretKey});
}