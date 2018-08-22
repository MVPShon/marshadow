const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    var randomPuppy = require('random-puppy');
var subreddits = [
    'Kitty',
    'Cutecats'
]
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
randomPuppy(sub)
    .then(url => {
        let embed = new Discord.RichEmbed()
            .setColor(0xfcf11e)
            .setFooter("Kitty <3")
            .setImage(url);
        message.channel.send({
            embed
        });
    })
}