const Discord = require("discord.js");
const Kaori = require('kaori');
const kaori = new Kaori();
exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.reply("This command can only be used on an NSFW channel!");
    kaori.search('rule34', {
            tags: [`${args[0]}`],
            limit: 1,
            random: true
        })
        .then(images => {
            (
                console.log(images[0].common.fileURL))
            message.channel.send(`Rule34 result for:* ${args[0]} *`)
            message.channel.send(images[0].common.fileURL)
        }).catch(err => message.channel.send("No image found for your search!"));
}
