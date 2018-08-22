const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("Sorry, you don't have permissions to use this!");
    var splitMessage = message.content.split(" ");
    var deleteCount = parseInt(splitMessage[1], 10)
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Please provide a number between 2 and 100 for the number of messages to delete. ");
    var fetched = await message.channel.fetchMessages({
        limit: deleteCount
    });
    message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

}

