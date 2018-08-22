const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
        return message.reply("Please mention a valid member of this server!");
    if (!member.kickable)
        return message.reply("I cannot kick this user! I may not have the sufficient permissions to kick this user or they may have a higher role than me!");
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";
    await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    let embed = new Discord.RichEmbed()
        .setAuthor("Kick", bot.user.displayAvatarURL)
        .setColor(0xfcf11e)
        .setTitle(`${member.user.tag} has been kicked by ${message.author.tag}.`)
        .setFooter(`${member.user.tag} has been cucked! I mean kicked.`)
        .addField(`Reason:`, `${reason}`)
    message.channel.send(embed);
}