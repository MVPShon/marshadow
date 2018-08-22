const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
        message.channel.send(new Date().getTime() - message.createdTimestamp + " ms.");
}
