const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    var malScraper = require('mal-scraper')

    var name = `${args.join(" ")}`

    malScraper.getInfoFromName(name)
        .then((data) => {
            let Embed = new Discord.RichEmbed()
                .setColor(0xfcf11e)
                .setTitle(data.title)
                .addField("Genres", data.genres)
                .addField("Status", data.status + " with " + data.episodes + " episodes.", true)
                .addField("Rated", data.rating, true)
                .addField("Summary", data.synopsis.slice(0,1021) + "...")
                .setThumbnail(data.picture)
                .setFooter("Ranked " + data.ranked + " on MAL.")
                .setURL(data.url)
            message.channel.send(Embed)
        }).catch((err) => console.log(err))
}
