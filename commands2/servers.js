const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
        var list = bot.guilds.array().sort();
        bot.users.get("168865955940794368").send("I am on `" + bot.guilds.size + "` servers.");
        bot.users.get("168865955940794368").send("These servers are: " + list);
    }