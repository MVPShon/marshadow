const Discord = require("discord.js");
const Kaori = require('kaori');
const kaori = new Kaori();

exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.reply("This command can only be used on an NSFW channel!");
    kaori.search('danbooru', {
            tags: [`${args[0]}`],
            limit: 1,
            random: true
        })
        .then(images => {
            (
                console.log(images[0].common.fileURL))
            let Embed = new Discord.RichEmbed()
                .setAuthor("Danbooru Search", bot.user.displayAvatarURL)
                .setColor(0xfcf11e)
                .setTitle(`Result for: ${args[0]}`)
                .setImage(images[0].common.fileURL)
            message.channel.send(Embed)
        }).catch(err => message.channel.send("No image found for your search!"));
}
