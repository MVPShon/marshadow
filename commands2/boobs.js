const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    if (!message.channel.nsfw) return message.reply("🔞 This command can only be used on an NSFW Channel! 🔞")
    var randomPuppy = require('random-puppy');
    var subreddits = [
        'Tits',
        'Nipples',
        'Boobies',
        'Titties',
        'Boobs'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
    randomPuppy(sub)
        .then(url => {
            let embed = new Discord.RichEmbed()
                .setColor(0xfcf11e)
                .setFooter("Boobs <3")
                .setImage(url);
            message.channel.send({
                embed
            });
        })
}