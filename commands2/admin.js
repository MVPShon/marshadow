const Discord = require("discord.js");
let prefix = "m!";
exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(`ADMIN Commands for ` + bot.user.username)
        .setColor(0xfcf11e)
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Ban", "Bans someone from your server. `Usage: " + prefix + "ban Marshadow`")
        .addField("Kick", "Kicks someone from your server. `Usage: " + prefix + "kick Marshadow`")
        .addField("Purge/Delete", "Purges/deletes up to 100 messages from chat. `Usage: " + prefix + "purge 50`")
    message.channel.send(embed)
}
