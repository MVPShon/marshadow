const Discord = require("discord.js");
let prefix = "m!";
exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(`NSFW Commands for ` + bot.user.username)
        .setColor(0xfcf11e)
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Ass","Booties of your dreams <3. Aliases (`butts, booty`)")
        .addField("Tits","Tits galore. Alias (`boobs`)")
        .addField("Danbooru","Searches Danbooru for hentai tags.")
        .addField("Hentai", "Pulls a random hentai picture off of Reddit.")
        .addField("Rule34/R34", "Searches https://rule34.xxx for hentai tags. `Usage: " + prefix + "rule34 Marshadow` *Note - Spaces are represented as UNDERSCORES on the R34 website*")
    message.author.send(embed)
}
