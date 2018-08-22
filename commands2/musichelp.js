const Discord = require("discord.js");
let prefix = ">>";
exports.run = async (bot, message, args) => {
let embed = new Discord.RichEmbed()
.setAuthor(`Music Commands for ` + bot.user.username)
.setColor(0xfcf11e)
.setThumbnail(bot.user.displayAvatarURL)
.addField("Add", "Adds a song using a specific link to the queue.")
.addField("Join", "Joins the bot to your music channel. `Usage: " + prefix + "join #MusicChannel`")
.addField("Pause", "Pauses the currently playing song.")
.addField("Play", "Plays the songs you've added to the queue.")
.addField("Queue", "Shows the currently queued songs")
.addField("Resume", "Resumes a song if paused.")
.addField("Search", "Searches for a song by name. You can type `" + prefix + "play` to immediately play/add the searched song. `Usage: " + prefix + "search In My Feelings Drake`")
.addField("Skip", "Skips the currently playing song.")
message.channel.send(embed)
}
