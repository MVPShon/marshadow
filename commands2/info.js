const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.round(totalSeconds % 60);
    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} second(s).`;
    let embed = new Discord.RichEmbed()
        .setAuthor(`Generated Stats`)
        .setColor(0xfcf11e)
        .addField("Name", bot.user.tag, true)
        .addField("Bot Owner", bot.users.get("168865955940794368").tag, true)
        .addField(`Servers `, bot.guilds.size, true)
        .addField(`Users `, bot.users.size, true)
        .addField("Uptime", uptime)
        .addField("Ping", new Date().getTime() - message.createdTimestamp + " ms.")
        .addField("Description", "Multi functional bot mostly focused on Pokemon. Mainly a Pokédex but can be so much more!")
        .addField("Important Links", "[Discord Server](https://discord.gg/tT8aZjJ) | [Website](https://marshadowbot.glitch.me/) | [Upvote Me!](https://discordbots.org/bot/463451155842727938/vote)")
        .setThumbnail(bot.user.displayAvatarURL)
    message.channel.send(embed);
}    
