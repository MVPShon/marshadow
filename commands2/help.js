const Discord = require("discord.js");
let prefix = "m!";
exports.run = async (bot, message, args) => {
        let embed = new Discord.RichEmbed()
            .setAuthor(`Help`)
            .setColor(0xfcf11e)
            .addField("Info", "To find basic info on the bot, just type `" + prefix + "info`")
            .addField("Commands", "Type `" + prefix + "commands` for a list of all commands.")
        message.channel.send(embed)
    }
