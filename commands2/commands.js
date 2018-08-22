const Discord = require("discord.js");
let prefix = ">>";
exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setThumbnail(bot.user.displayAvatarURL)
    .setColor(0xfcf11e)
    .addField("MAL","Search for a specific anime's info off of MyAnimeList!")
    .addField("Meme/Edgy","Pulls a random meme off of Reddit!")
    .addField("Dog","Shows a random image of a dog! Aliases (`pupper, doge, puppy`)")
    .addField("Cat","Shows a random image of a cat! Aliases (`kitty, neko`)")
    .addField("Roast","Insult your friends with my ever-growing list of roasts and insults!")
    .addField("Copy","Straight forward command. I copy whatever you tell me to. This command works better if I can delete other people's messages.")
    .addField("Invite","Provides a link to invite " + bot.user.username + " to your server.")
    .addField("Roll","Roll the die.")
    .addField("User-info","Provides detailed information about the user mentioned.")
    .setFooter("For all music related commands type: " + prefix + "musichelp | For all admin commands type: |For all NSFW commands type: " + prefix + "nsfw")
    message.channel.send(embed)
}
