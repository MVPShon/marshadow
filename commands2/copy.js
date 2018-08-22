const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
        let repeat = args.join(" ")
        message.delete();
        message.channel.send(repeat)
    }