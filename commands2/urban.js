const Discord = require("discord.js");
exports.run = async (evileye, message, args) => {
    const urban = require('urban.js');
 
urban(`${args.join(" ")}`).then(data => {
    let embed = new Discord.RichEmbed()
    .setColor(0xff6464)
    .setTitle("Defnition for: " + data.word.replace(/\[|\]/g, ""))
    .setDescription(data.definition.replace(/\[|\]/g, ""))
    .addField("Example", data.example.replace(/\[|\]/g, ""))
    .setURL(data.URL)
    .setFooter(data.thumbsUp + " thumbs up • " + data.thumbsDown + " thumbs down")
    .setThumbnail("https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/bd/e1/5f/bde15fab-2c38-9a76-0f9b-3c48bb55dfb9/AppIcon-1x_U007emarketing-85-220-0-6.png/246x0w.jpg")
    message.channel.send(embed)
}).catch(error => {
    message.reply(`Error: ${error.TypeError}.`);
});}