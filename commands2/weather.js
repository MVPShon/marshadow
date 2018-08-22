const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
    var weather = require('weather-js'); 
    weather.find({search: `${args.join(" ")}`, degreeType: 'F'}, function(err, result) {
      if(err) return message.reply('Please enter a valid location!');
      if (result === undefined || result.length === 0) {
        message.reply('Please enter a valid location!')
        return;
    }
    var current = result[0].current;
    var location = result[0].location;
      let Embed = new Discord.RichEmbed()
      .setTitle("Weather results for `" + location.name + "`.")
      .setColor(0xFE2E2E)
      .addField("Skies Are", current.skytext, true)
      .addField("Humidity", current.humidity, true)
      .addField("Currently", current.temperature + "°F", true)
      .addField("Feels Like", current.feelslike + "°F", true)
      .setThumbnail(current.imageUrl)
      message.channel.send(Embed)
    });
}