const Discord = require("discord.js");
let prefix = ">>";
exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setThumbnail(bot.user.displayAvatarURL)
    .setColor(0xfcf11e)
    .addField("Dex","Brings up a Pokemon's information and stats!")
    .addField("Ability","Explains a specific Pokemon ability.")
    .addField("Item","Explains a specific Pokemon item")
    .addField("Move","Provides information on a Pokemon move")
    .addField("Smogon","Random Smogon Pokemon information.")
    .addField("Type","Provides type information for a Pokemon type.")
    .setFooter("For all music related commands type: " + prefix + "musichelp | For all admin commands type: |For all NSFW commands type: " + prefix + "nsfw")
    message.channel.send(embed)
}
