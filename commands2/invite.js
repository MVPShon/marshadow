const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setThumbnail(bot.user.displayAvatarURL)
    .setColor(0xfcf11e)
    .setDescription("I am so glad that you're enjoying using **" + bot.user.username + "**! \n\nIf you would like to invite this bot to another server then click the following link:\n\n[Invite Me!](https://discordapp.com/oauth2/authorize?client_id=463451155842727938&scope=bot&permissions=21469585912)");
    message.channel.send(embed)
}
