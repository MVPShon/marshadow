const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
if (!message.channel.nsfw) return message.reply("🔞 This command can only be used on an NSFW Channel! 🔞")
var titpic = require('reddittits');
titpic(function(data, err) {
    var embed = new Discord.RichEmbed()
        .setTitle(data.title[0])
        .setColor(0xff6464)
        .setImage(data.url[0])
        .setFooter("r/"+data.subreddit[0])
    message.channel.send({
        embed
    });
});
}
