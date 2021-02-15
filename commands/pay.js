const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "pay"
    },
    run: async (bot, message, args) => {
        message.delete();
        if(!message.member.roles.cache.has(bot.config.Bot.authorizedRole)) return message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errImg).setTitle('You have insufficient permissions for this command!')).then(m => m.delete({ timeout: 10000 }));
        if(!args || !args[0] || isNaN(args[0]) || args[0] < 1 || !args[1] || !args[2]) return message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errImg).setTitle('Missing arguments').setDescription(bot.help)).then(m => m.delete({ timeout: 15000 }));
        if(!bot.config.paypal || !bot.config.paypal.businessName || !bot.config.paypal.currency || !bot.config.paypal.mode || !bot.config.paypal.appID || !bot.config.paypal.secretKey || !bot.config.paypal.terms) return new message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errImg).setTitle('Error while executing this command, check the paypal config and try again')).then(m => m.delete({ timeout: 20000 }));
        const money = args[0];
        const pTitle = args[1];
        const pDetails = args.splice(2).join(' ');
        let url;

        const invoice = {'merchant_info': {'business_name': bot.config.paypal.businessName},'items': [{'name': pTitle,'quantity': 1.0,'unit_price': {'currency': bot.config.paypal.currency,'value': money}}],'note': pDetails,'terms': bot.config.paypal.terms,'tax_inclusive': false,'total_amount': {'currency': bot.config.paypal.currency,'value': money}};

        let embed = await message.channel.send(new MessageEmbed().setColor(bot.config.embed.pendingColor).setTitle("PayPal").setDescription("Generating a new Invoice. Please wait..."));

        bot.paypal.invoice.create(invoice, async function (err, res) {
            if (err) return embed.edit(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errImg).setTitle('Error while creating the invoice').setDescription(`> **Error:** ${err.response.name}`));
            bot.paypal.invoice.send(res.id, async function (error) {
                if (error) return embed.edit(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errImg).setTitle('Error while creating the invoice').setDescription(`An error occurred while processing the invoice. The invoice could not be generated.\n**Error:** ${err.response.name}`));
                for (let i = 0; i < res.links.length; i++) {
                    if (res.links[i].rel === 'send') {
                        url = res.links[i].href;
                        url = url.slice(12, url.indexOf('.com'));
                        await embed.edit(new MessageEmbed().setColor(bot.config.embed.pendingColor).setTitle("Payment").setDescription(`Now please make a payment of $${money.toString()}. Click [here](https://${url}.com/invoice/payerView/details/${res.id}) to make the payment.\n\nThe Bot will automatically verify payment. Once payment is made please be patient as the bot verifies it.`).setTimestamp());
                    }
                }
                let invoiceStatus = setInterval(async function () {
                    bot.paypal.invoice.get(res.id, async function (error2, inv) {
                        if (error2) return embed.edit(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errImg).setTitle("PayPal").setDescription(`An error occurred while trying to verify payment.\n**Error:** ${err.response.name}`));
                        if (inv.status === 'PAID') {
                            clearInterval(invoiceStatus);
                            embed.edit(new MessageEmbed().setColor(bot.config.embed.successColor).setTitle("Payment Verified!").setDescription(`The invoice has been paid!\n[Click here](https://${url}.com/invoice/payerView/details/${inv.id}) to see the bill paper.`).setTimestamp());
                        }
                    });
                }, bot.config.paypal.billCheck * 1000);
            });
        });
    }
}