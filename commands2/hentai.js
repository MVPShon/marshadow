const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.reply("🔞 This command can only be used on an NSFW Channel! 🔞")
    var randomPuppy = require('random-puppy');
    var subreddits = [
        'Hentai',
        'HQHentai',
        'HentaiPics',
        'Rule34'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
    randomPuppy(sub)
        .then(url => {
            let embed = new Discord.RichEmbed()
                .setColor(0xfcf11e)
                .setFooter("Hentai <3")
                .setImage(url);
            message.channel.send({
                embed
            });
        })
}
