const Discord = require("discord.js");
oakdexPokedex = require('oakdex-pokedex');
fs = require("fs"),
    jsonfile = require("jsonfile"),
    path = require("path"),
    request = require("request"),
    colors = require('colors'),
    italics = require('./data/italics.js'),
    requireFromUrl = require('require-from-url');
var config = require('./config.js'),
    otherAliases = require('./data/otherAliases.js'),
    imageCheck,
    dex = require('./data/pokedex.js').BattlePokedex,
    species = [],
    aliases = require('./data/aliases.js').BattleAliases;
Object.keys(dex).map(function(key, index) {
    species.push(dex[key].species.toLowerCase());
});
let bot = new Discord.Client();
let prefix = "m!";
const Kaori = require('kaori');
const kaori = new Kaori();
const Music = require('discord.js-musicbot-addon');
const API = require('lol-stats-api-module');

const api = new API({
        key: 'RGAPI-0b949cf9-f8c8-48ae-941b-2f196696225f',
        region: 'na'
    });

const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL, bot);

dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
  console.log("Starting bot...");

  var commands = loadCommands(); // Load commands into the commands object
  
bot.on("ready", async () => {
    let statuses = [
        `${bot.guilds.size} servers!`,
        `over ${bot.users.size} people!`,
        `\"${prefix}` + `help\" for help with ${bot.user.username}`,
        `${bot.channels.size} rooms!`,
        `newest episode of Pokémon!`
    ]

    console.log("Marshadow is ready to go!")
    bot.users.get("168865955940794368").send(`${bot.user.username} has just restarted! \n${bot.user.username} has been up for ${bot.uptime} milliseconds!`)
    setInterval(function() {
    let status = Math.floor((Math.random() * statuses.length));
    bot.user.setActivity(statuses[status], {
        type: 'WATCHING'
    })
    }, 15000)
});

  function loadCommands() {
      console.log('Loading commands...'.cyan);
      let commands = {}, // Initialize values
          errCount = 0;
      cmdfiles = fs.readdirSync('./commands/'); // Read files in the commands directory
      cmdfiles.forEach(filename => {
          var cmdName = filename.split('.')[0];
          try { // Attempt to load the command into the bot
              commands[cmdName] = require('./commands/' + filename);
              console.log('Loaded '.green + cmdName.yellow.bold);
          } catch (err) { // If unsuccessful, display an error
              if (err) {
                  errCount++;
                  console.log('Error in '.red + cmdName.yellow + '!'.red + '\n' + err.stack);
              }
          }
      });
      console.log('Loaded commands with '.cyan + (errCount > 0 ? errCount.toString().red : 'no'.green) + ` error${errCount == 1? '' : 's'}!`.cyan); // Print number of errored commands, if any.
      return commands;
  }
  
  
  bot.on("message", msg => { // Fires when a message is sent that can be detected by bot
      if (msg.author.id != bot.user.id && !msg.author.bot) { // Ensures bot doesn't detect messages from bots or itself 
          if (msg.content.startsWith(config.prefix)) { // Check to see if the message is an attempted command
              let commandstring = msg.content.substring(config.prefix.length),
                  cmd = commandstring.split(" ")[0], // Split the message into more readable argument/command portions
                  args = commandstring.substring(cmd.length + 1);
  
              if (commands[cmd]) { // If a command by the name of the attempted name exists, try to fire it
                  try {
                      commands[cmd].action(msg, args, bot);
                  } catch (err) {
                      console.error(err); // If unsuccessful, log the error.
                  }
                  // TO MOVE TO SEPARATE FILES
              } else if (cmd == "obtain") {
                  msg.channel.send("Honestly, just use Bulbapedia. The encounter data on the web is so inconsistent and undreadable that there's no way I could create an obtainability command. Sorry about that. 🙁");
              } else if (cmd == "deathbird") {
                  msg.channel.send('', {
                      file: "https://i.imgur.com/pIxQQXA.png",
                      name: "DEATHBIRD.png"
                  });
              } else if (cmd == "youtried") {
                  msg.channel.send('', {
                      file: "https://i.imgur.com/bAxMdQ0.png",
                      name: "Filename.jpeg.gif.webp.mp4.exe.bat.sh.app.png"
                  });
              } else if (msg.author.id == 120887602395086848) { // Commands only to be fired by the bot's owner
                  if (cmd == 'eval') {
                      try {
                          msg.channel.send("", {
                              embed: {
                                  title: '🖥 JavaScript Eval',
                                  fields: [{
                                          name: "Input",
                                          value: args
                                      },
                                      {
                                          name: "Output",
                                          value: String(eval(args)) // jshint ignore:line
                                      }
                                  ],
                                  color: 5561189
                              }
                          });
                      } catch (err) {
                          msg.channel.send("", {
                              embed: {
                                  title: '⚠ Error',
                                  fields: [{
                                          name: "Input",
                                          value: args
                                      },
                                      {
                                          name: "Error",
                                          value: err.toString()
                                      }
                                  ],
                                  color: 16724015
                              }
                          });
                      }
                  }
              }
          } else if (msg.content == bot.user) {
              msg.react(bot.emojis.get('168865955940794368'))
                  .catch(console.error)
          } else { // If a command was fired, do not check for italics in the messsage.
              checkItalics(msg);
          }
      }
  });
  
  
  function capitalizeFirstLetter(string) { // Simple function to capitalize the first letter in a string.
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function checkItalics(msg) { // Function to be fired if a message is valid for italicization checking
      let isFound = false,
          pokePast = [],
          pokeCount = 0,
          splits = [msg.content.replace(/#/g, '').replace(/\?/g, '').split("*"), msg.content.replace(/#/g, '').replace(/\?/g, '').split("_")];
      var pokeName;
      for (let j = 0; j < 2; j++) {
          if (isFound) return;
          for (var i = 1; i < splits[j].length - 1; i++) { // Check each substring between asterixes/underscores
              pokeName = splits[j][i].toLowerCase();
              if (italics[pokeName]) {
                  if (pokeCount > 1) break;
                  if (pokePast.indexOf(pokeName) != -1) continue;
                  pokePast.push(pokeName);
                  pokeCount++;
                  italics[pokeName].action(msg);
                  isFound = true;
                  continue;
              }
              let isShiny = false, // Sprite defaults to a non-shiny version
                  urlBuild = 'https://play.pokemonshowdown.com/sprites/xyani/', // Default constructor for a sprite
                  a = otherAliases.aliases(msg.guild.id);
              for (let r in a) {
                  if (pokeName.startsWith(r)) pokeName = pokeName.replace(`${r} `, `${a[r]} `);
                  if (pokeName.endsWith(r)) pokeName = pokeName.replace(` ${r}`, ` ${a[r]}`);
                  if (pokeName == r) pokeName = a[r];
                  if (pokeName.indexOf(` ${r} `) > -1) pokeName = pokeName.replace(` ${r} `, ` ${a[r]} `);
              }
              if (pokeName.split(" ")[0] == "mega") {
                  pokeName = pokeName.substring(pokeName.split(" ")[0].length + 1) + "-mega";
              } else if (pokeName.split(' ')[0] == "alolan") {
                  pokeName = pokeName.substring(pokeName.split(" ")[0].length + 1) + "-alola";
              }
              if (pokeName.indexOf('shiny') != -1) { // Detect if the potential pokemon is a shiny
                  isShiny = true;
                  pokeName = pokeName.replace(' shiny', '').replace('shiny ', '').replace('-shiny', '').replace('shiny-', '').replace('shiny', '');
  
              }
              pokeName = pokeName.replace(" ", "-");
              let imgPoke = pokeName.toLowerCase();
              if (pokeCount > 1) break;
              if (pokePast.indexOf(imgPoke) != -1) continue;
              pokePast.push(imgPoke);
              if (species.indexOf(imgPoke) > -1) pokeCount++;
              if (isShiny) urlBuild = 'https://play.pokemonshowdown.com/sprites/xyani-shiny/';
              /* jshint ignore:start */
              request(urlBuild + imgPoke + ".gif", (err, response) => { // Check to see if the sprite for the desired Pokemon exists
                  if (!err && response.statusCode == 200) {
                      msg.channel.send('', { // If it does, send it  
                          file: response.request.href
                      });
                      isFound = true;
                  }
              });
              /* jshint ignore:end */
              if (isFound) break;
          }
      }
  }

bot.on("guildCreate", guild => {
    bot.users.get("168865955940794368").send("`" + guild.owner.user.username + "` has just added me to their server: `" + guild.name + "`");
});
bot.on("guildDelete", guild => {
    bot.users.get("168865955940794368").send("`" + guild.owner.user.username + "` has just removed me from their server: `" + guild.name + "`");
});



bot.on("message", async message => {
    let messsageArray = message.content.split(" ");
    let command = messsageArray[0];
    let args = messsageArray.slice(1);

    if (message.content.startsWith(prefix + "google") || (message.content.startsWith(prefix + "g") || (message.content.startsWith(prefix + "goog")))) {
        var google = require("google");
        google.resultsPerPage = 1
        var nextCounter = 0
        google(`${args.join(" ")}`, function(err, res) {
            var link = res.links[0];
            if (!link) return message.reply("No results found for your search!");
            if (!link.link === "null") return message.reply("There is no link for this!");
            if (!link.title === "null") return message.reply("There is no title for this!");
            if (!link.description) return message.reply("There is no description for this!");
            console.log(link);
            let Embed = new Discord.RichEmbed()
                .setAuthor("Google Search", bot.user.displayAvatarURL)
                .setColor(0xfcf11e)
                .setTitle(link.title)
                .addField("Description:", link.description)
                .setURL(link.link)
            message.channel.send(Embed)
        });
    }

    if (message.content.startsWith(prefix + "yt") || (message.content.startsWith(prefix + "youtube") || (message.content.startsWith(prefix + "yootoob")))) {
        var APIKEY = "AIzaSyB_8RLjvATBxCzSlrwQt2ghdYk0mJTjupw";
        var QUERY = `${args.join(" ")}`;
        var {
            YTSearcher
        } = require('ytsearcher');
        var ytsearcher = new YTSearcher(APIKEY);
        ytsearcher.search(QUERY, {
                type: 'video'
            })
            .then(searchResult => {
                searchResult.nextPage()
                    .then(secondPage => {
                        var page = secondPage.currentPage;
                        var videoEntry = page[1];
                        let Embed = new Discord.RichEmbed()
                            .setAuthor("YouTube Search", bot.user.displayAvatarURL)
                            .setColor("RED")
                            .setTitle(videoEntry.title)
                            .setImage(videoEntry.thumbnails.high.url)
                            .setDescription(videoEntry.description)
                            .setURL(videoEntry.url);
                        message.channel.send(Embed)
                    }).catch(err => message.reply("No results found!"));
            });

    }
    
if (message.content.startsWith(prefix + "weather")) {
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
    if (message.content.startsWith(prefix + "ass") || (message.content.startsWith(prefix + "butts") || (message.content.startsWith(prefix + "booty")))) {
        if (!message.channel.nsfw) return message.reply("🔞 This command can only be used on an NSFW Channel! 🔞")
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'Ass',
            'Butts',
            'Butt',
            'Booties',
            'DatAss',
            'Pawg',
            'Booty'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setFooter("Booty <3")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }
    if (message.content.startsWith(prefix + "tits") || (message.content.startsWith(prefix + "boobs"))) {
        if (!message.channel.nsfw) return message.reply("🔞 This command can only be used on an NSFW Channel! 🔞")
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'Tits',
            'Nipples',
            'Boobies',
            'Titties',
            'Boobs'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setFooter("Boobs <3")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }
    if (message.content.startsWith(prefix + "hentai")) {
        if (!message.channel.nsfw) return message.reply("🔞 This command can only be used on an NSFW Channel! 🔞")
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'Hentai',
            'HQHentai',
            'HentaiPics',
            'Rule34'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setFooter("Hentai <3")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }

    if (message.content.startsWith(prefix + "meme")) {
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'MemeEconomy',
            'BlackPeopleTwitter',
            'bee_irl',
            'Memes',
            'Dankmemes',
            'WholesomeMemes',
            'Meirl',
            'Animemes'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }
    if (message.content.startsWith(prefix + "edgy")) {
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'OffensiveMemes',
            'ImGoingToHellForThis'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }

    if (message.content.startsWith(prefix + "info")) {
        let totalSeconds = (bot.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let uptime = `${hours} hours, ${minutes} minutes and ${seconds} second(s).`;
        let embed = new Discord.RichEmbed()
            .setAuthor(`Generated Stats`)
            .setColor(0xfcf11e)
            .addField("Name", bot.user.tag, true)
            .addField("Bot Owner", bot.users.get("168865955940794368").tag, true)
            .addField(`Servers `, bot.guilds.size, true)
            .addField(`Users `, bot.users.size, true)
            .addField("Uptime", uptime)
            .addField("Ping", new Date().getTime() - message.createdTimestamp + " ms.")
            .addField("Description", "Multi functional bot mostly focused on Pokemon. Mainly a Pokédex but can be so much more!")
            .addField("Important Links", "Discord Server: https://discord.gg/tT8aZjJ")
            .setThumbnail(bot.user.displayAvatarURL)
        message.channel.send(embed);
    }    if (message.content.startsWith(prefix + "mal ")) {
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




    if (message.content.startsWith(prefix + "servers")) {
        var list = bot.guilds.array().sort();
        bot.users.get("168865955940794368").send("I am on `" + bot.guilds.size + "` servers.");
        bot.users.get("168865955940794368").send("These servers are: " + list);
    }
    if (message.content.startsWith(prefix + "rule34") || (message.content.startsWith(prefix + "r34"))) {
        if (!message.channel.nsfw) return message.reply("This command can only be used on an NSFW channel!");
        kaori.search('rule34', {
                tags: [`${args[0]}`],
                limit: 1,
                random: true
            })
            .then(images => {
                (
                    console.log(images[0].common.fileURL))
                let Embed = new Discord.RichEmbed()
                    .setAuthor("Rule34 Search", bot.user.displayAvatarURL)
                    .setColor(0xfcf11e)
                    .setTitle(`Result for: ${args[0]}`)
                    .setImage(images[0].common.fileURL)
                message.channel.send(Embed)
            }).catch(err => message.channel.send("No image found for your search!"));
    }
    if (message.content.startsWith(prefix + "danbooru") || (message.content.startsWith(prefix + "db"))) {
        if (!message.channel.nsfw) return message.reply("This command can only be used on an NSFW channel!");
        kaori.search('danbooru', {
                tags: [`${args[0]}`],
                limit: 1,
                random: true
            })
            .then(images => {
                (
                    console.log(images[0].common.fileURL))
                let Embed = new Discord.RichEmbed()
                    .setAuthor("Danbooru Search", bot.user.displayAvatarURL)
                    .setColor(0xfcf11e)
                    .setTitle(`Result for: ${args[0]}`)
                    .setImage(images[0].common.fileURL)
                message.channel.send(Embed)
            }).catch(err => message.channel.send("No image found for your search!"));
    }

    if (message.content.startsWith(prefix + "cat") || (message.content.startsWith(prefix + "kitty") || (message.content.startsWith(prefix + "neko")))) {
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'Kitty',
            'Cutecats'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setFooter("Kitty <3")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
    }

    if (message.content.startsWith(prefix + "dog") || (message.content.startsWith(prefix + "doge") || (message.content.startsWith(prefix + "pupper") || (message.content.startsWith(prefix + "puppy"))))) {
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'Puppy',
            'Cutepuppies'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setFooter("Pupper <3")
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
        message.channel.send(embed)
    }

    if (message.content.startsWith(prefix + "food")) {
        var randomPuppy = require('random-puppy');
        var subreddits = [
            'FoodPorn',
            'Food'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub)
            .then(url => {
                let embed = new Discord.RichEmbed()
                    .setColor(0xfcf11e)
                    .setImage(url);
                message.channel.send({
                    embed
                });
            })
        message.channel.send(embed)
    }

    if (message.content.startsWith(prefix + "kick")) {
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

    if (message.content.startsWith(prefix + "purge") || (message.content.startsWith(prefix + "delete"))) {
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


    if (message.content.startsWith(prefix + "ban")) {
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.bannable)
            return message.reply("I cannot ban this user! I may not have the sufficient permissions to ban this user or they may have a higher role than me!");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";
        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        let embed = new Discord.RichEmbed()
            .setAuthor("Ban", bot.user.displayAvatarURL)
            .setColor(0xfcf11e)
            .setTitle(`${member.user.tag} has been banned by ${message.author.tag}.`)
            .setFooter(`${member.user.tag} has been banned.`)
            .addField(`Reason:`, `${reason}`)
        message.channel.send(embed);
    }
    if (message.content.startsWith(prefix + "stfu")) {
        setTimeout(function() {}, 10000);
        message.delete();
        message.channel.send("Seriously, just shut the fuck up! <:stfu:461992028453208064>")
    }
    if (message.content.startsWith(prefix + "copy")) {
        let repeat = args.join(" ")
        message.delete();
        message.channel.send(repeat)
    }
    if (message.content.includes("Good one")) {
        message.channel.send("Let's hear another.");
    }
    if (message.content.includes("good one")) {
        message.channel.send("Let's hear another.");
    }
    if (message.content.includes(" crine ")) {
        message.channel.send("crying*");
    }
    if (message.content.includes(" im dine ")) {
        message.channel.send("dying*");
    }
    if (message.content.includes("yo said")) {
        message.channel.send("You said*");
    }
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send(new Date().getTime() - message.createdTimestamp + " ms.");
    }
    if (message.content.startsWith(prefix + "help")) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`Help`)
            .setColor(0xfcf11e)
            .addField("Info", "To find basic info on the bot, just type `" + prefix + "info`")
            .addField("Commands", "Type `" + prefix + "commands` for a list of all commands.")
        message.channel.send(embed)
    }
    if (message.content.startsWith(prefix + "commands")) {
        let embed = new Discord.RichEmbed()
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor(0xfcf11e)
        .addField("Youtube/YT","Brings up a link to a video based on your terms.")
        .addField("MAL","Search for a specific anime's info off of MyAnimeList!")
        .addField("Meme/Edgy","Pulls a random meme off of Reddit!")
        .addField("Dog","Shows a random image of a dog! Aliases (`pupper, doge, puppy`)")
        .addField("Cat","Shows a random image of a cat! Aliases (`kitty, neko`)")
        .addField("Roast","Insult your friends with my ever-growing list of roasts and insults!")
        .addField("Copy","Straight forward command. I copy whatever you tell me to. This command works better if I can delete other people's messages.")
        .addField("Dex","Brings up a Pokemon's information and stats!")
        .addField("Ability","Explains a specific Pokemon ability.")
        .addField("Item","Explains a specific Pokemon item")
        .addField("Invite","Provides a link to invite " + bot.user.username + " to your server.")
        .addField("Move","Provides information on a Pokemon move")
        .addField("Roll","Roll the die.")
        .addField("Smogon","Random Smogon Pokemon information.")
        .addField("Type","Provides type information for a Pokemon type.")
        .addField("User-info","Provides detailed information about the user mentioned.")
        .setFooter("For all music related commands type: " + prefix + "musichelp | For all admin commands type: |For all NSFW commands type: " + prefix + "nsfw")
        message.channel.send(embed)
    }
    if (message.content.startsWith(prefix + "admin")) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`ADMIN Commands for ` + bot.user.username)
            .setColor(0xfcf11e)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Ban", "Bans someone from your server. `Usage: " + prefix + "ban Marshadow`")
            .addField("Kick", "Kicks someone from your server. `Usage: " + prefix + "kick Marshadow`")
            .addField("Purge/Delete", "Purges/deletes up to 100 messages from chat. `Usage: " + prefix + "purge 50`")
        message.channel.send(embed)
    }

    if (message.content.startsWith(prefix + "nsfw")) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`NSFW Commands for ` + bot.user.username)
            .setColor(0xfcf11e)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Ass","Booties of your dreams <3. Aliases (`butts, booty`)")
            .addField("Tits","Tits galore. Alias (`boobs`)")
            .addField("Danbooru","Searches Danbooru for hentai tags.")
            .addField("Hentai", "Pulls a random hentai picture off of Reddit.")
            .addField("Rule34/R34", "Searches https://rule34.xxx for hentai tags. `Usage: " + prefix + "rule34 Marshadow` *Note - Spaces are represented as UNDERSCORES on the R34 website*")
        message.author.send(embed)
    }
    if (message.content.startsWith(prefix + "musichelp")) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`Music Commands for ` + bot.user.username)
            .setColor(0xfcf11e)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Add", "Adds a song using a specific link to the queue. `Usage: " + prefix + "add https://www.youtube.com/watch?v=3WSgJCYIewM`")
            .addField("Join", "Joins the bot to your music channel. `Usage: " + prefix + "join #MusicChannel`")
            .addField("Pause", "Pauses the currently playing song.")
            .addField("Play", "Plays the songs you've added to the queue.")
            .addField("Queue", "Shows the currently queued songs")
            .addField("Resume", "Resumes a song if paused.")
            .addField("Search", "Searches for a song by name. You can type `" + prefix + "play` to immediately play/add the searched song. `Usage: " + prefix + "search In My Feelings Drake`")
            .addField("Skip", "Skips the currently playing song.")
        message.channel.send(embed)
    }
    if (message.content.startsWith(prefix + "invite")) {
        message.channel.send("If you'd ike to invite me to your server then please click the following link: https://discordapp.com/oauth2/authorize?client_id=463451155842727938&scope=bot&permissions=21469585912");
    }
    if (message.content.startsWith(prefix + "roast")) {
        let insults = [
            "a douche of your magnitude could cleanse the vagina of a whale.",
            "if you want my comeback, you're gonna have to wipe it off your mom's face.",
            "whoever's willing to fuck you is just too lazy to jerk off.",
            "your mother should've just swallowed you.",
            "your mother should've swallowed you. Her stomachache is nothing worse than the headache I have to deal with when listening to you.",
            "I'd tell you to go eat a dick, but I don't want to tell you how to do your job.",
            "if laughter is the best medicine, your face must be curing the world.",
            "you're so ugly, you scared the crap out of the toilet.",
            "your family tree must be a cactus because everybody on it is a prick.",
            "no I'm not insulting you, I'm describing you.",
            "it's better to let someone think you are an idiot than to open your mouth and prove it.",
            "if I had a face like yours, I'd sue my parents.",
            "your birth certificate is an apology letter from the condom factory.",
            "I guess you prove that even god makes mistakes sometimes.",
            "the only way you'll ever get laid is if you crawl up a chicken's ass and wait.",
            "you're so fake, Barbie is jealous.",
            "I’m jealous of people that don’t know you!",
            "if I wanted to kill myself I'd climb your ego and jump to your IQ.",
            "you must have been born on a highway because that's where most accidents happen.",
            "brains aren't everything. In your case they're nothing.",
            "I don't know what makes you so stupid, but it really works.",
            "I can explain it to you, but I can’t understand it for you.",
            "roses are red violets are blue, God made me pretty, what happened to you?",
            "behind every fat woman there is a beautiful woman. No seriously, your in the way.",
            "calling you an idiot would be an insult to all the stupid people.",
            "you, sir, are an oxygen thief!",
            "some babies were dropped on their heads but you were clearly thrown at a wall.",
            "don't like my sarcasm? Well I don't like your stupid.",
            "why don't you go play in traffic.",
            "I'd slap you, but that would be animal abuse.",
            "they say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.",
            "stop trying to be a smart ass, you're just an ass.",
            "if I wanted to listen to your voice, I'd just record myself taking a shit.",
            "I'm not saying I hate you just that I would unplug your life support to charge my phone.",
            "the last time I saw something like you, I flushed it.",
            "I'm busy now. Can I ignore you some other time?",
            "you have Diarrhea of the mouth; constipation of the ideas.",
            "if ugly were a crime, you'd get a life sentence.",
            "your mind is on vacation but your mouth is working overtime.",
            "I can lose weight, but you’ll always be ugly.",
            "why don't you slip into something more comfortable... like a coma.",
            "shock me, say something intelligent.",
            "awww... it’s cute when you try to talk about things you don’t understand.",
            "if you’re gonna be a smartass, first you have to be smart. Otherwise, you’re just an ass.",
            "don't feel bad. A lot of people have no talent.",
            "let's go to the zoo. I've always wanted to meet your family.",
            "somewhere out there, there's a tree working very hard to produce oxygen so that you can breathe. I think you should go and apologize to it.",
            "I’ll try being nicer if you try being smarter.",
            "your ass must be jealous of all the shit that comes out of your mouth.",
            "I’d insult you, but then I’d have to explain it afterwards, so never mind.",
            "I don’t understand your specific kind of ‘stupidity,’ but I do admire your total commitment to it.",
            "if you really want to know about mistakes, you should ask your parents.",
            "I have neither the time nor the crayons to explain this to you.",
            "I’ve met several pricks before, but you sir are a cactus.",
            "the trash gets picked up early tomorrow. Be ready.",
            "you shouldn’t act hard-to-get when you’re already hard-to-like.",
            "if you spoke your mind, you’d be speechless.",
            "the last time I saw something like you, I flushed it.",
            "I would love to insult you, but that would be beyond the level of your intelligence.",
            "if your gonna be two faced, honey at least make one of them pretty.",
            "keep rolling your eyes, perhaps you'll find a brain back there.",
            "you are not as bad as people say, you are much, much worse.",
            "I don't know what your problem is, but I'll bet it's hard to pronounce.",
            "you get ten times more girls than me? ten times zero is zero...",
            "there is no vaccine against stupidity.",
            "you're the reason the gene pool needs a lifeguard.",
            "sure, I've seen people like you before - but I had to pay an admission.",
            "how old are you? - Wait I shouldn't ask, you can't count that high.",
            "have you been shopping lately? They're selling lives, you should go get one.",
            "you're like Monday mornings, nobody likes you.",
            "of course I talk like an idiot, how else would you understand me?",
            "all day I thought of you... I was at the zoo.",
            "to make you laugh on Saturday, I need to you joke on Wednesday.",
            "you're so fat, you could sell shade.",
            "I'd like to see things from your point of view but I can't seem to get my head that far up my ass.",
            "don't you need a license to be that ugly?",
            "my friend thinks he is smart. He told me an onion is the only food that makes you cry, so I threw a coconut at his face.",
            "your house is so dirty you have to wipe your feet before you go outside.",
            "if you really spoke your mind, you'd be speechless.",
            "stupidity is not a crime so you are free to go.",
            "you are so old, when you were a kid rainbows were black and white.",
            "if I told you that I have a piece of dirt in my eye, would you move?",
            "you're so dumb, you think Cheerios are doughnut seeds.",
            "so, a thought crossed your mind? Must have been a long and lonely journey.",
            "you are so old, your birth-certificate expired.",
            "every time I'm next to you, I get a fierce desire to be alone.",
            "you're so dumb that you got hit by a parked car.",
            "keep talking, someday you'll say something intelligent!",
            "you're so fat, you leave footprints in concrete.",
            "boy, you're literally just ugly as shit.",
            "how did you get here? Did someone leave your cage open?",
            "pardon me, but you've obviously mistaken me for someone who gives a damn.",
            "wipe your mouth, there's still a tiny bit of bullshit around your lips.",
            "don't you have a terribly empty feeling - in your skull?",
            "as an outsider, what do you think of the human race?",
            "just because you have one doesn't mean you have to act like one.",
            "we can always tell when you are lying. Your lips move.",
            "God wasted a good asshole when he decided to put teeth in your mouth.",
            "people like you are the reason God doesn't talk to us anymore.",
            "you know, you're kinda like Rapunzel. But, instead of letting your hair down you just let everyone in your life down.",
            "are you always this stupid or is today a special occasion?",
            "it looks like your face caught on fire and someone tried to put it out with a hammer.",
            "please, I could remove 90% of your 'beauty' with a tissue.",
            "I thought of you today. It reminded me to take the garbage out.",
            "if I gave you a penny for your thoughts, I'd get change.",
            "is your ass jealous of the amount of shit that just came out of your mouth?",
            "I don't exactly hate you, but if you were on fire and I had water, I'd drink it.",
            "are you always an idiot or just when I'm around?",
            "now I know why everybody talks about you behind your back.",
            "you're so fat the only letters of the alphabet you know are KFC.",
            "you look like your mom let you have your first beer through your umbilical cord.",
            "the only thing that goes erect when I'm near you is my middle finger.",
            "I tried to see things from your perspective, but I couldn't seem to shove my head that far up my ass.",
            "all the branches fell off your family tree when you were born.",
            "the only positive thing about you is your HIV status.",
            "if you were anymore inbred you would be a sandwich.",
            "you have enough fat to make another human.",
            "hey, you have something on your chin...3rd one down.",
            "why call me an ass if you came out of my ass? You piece of shit.",
            "you bring everyone a lot of joy, when you leave the room."
        ]

        let result = Math.floor((Math.random() * insults.length));
        if (args[0]) {
            if (message.mentions) {
                if (message.mentions.users) {
                    targetUser = message.guild.members.get(message.mentions.users.first().id);
                }
            }
        }
        if (args[0]) {
            let embed = new Discord.RichEmbed()
                .setAuthor("Roast", bot.user.displayAvatarURL)
                .setColor(0xfcf11e)
                .setTitle(`${targetUser.user.username} ${insults[result]}`)
                .setFooter("How does it feel getting roasted by a bot?")
            message.channel.send(embed)
        }

        if (!args[0]) {
            let embed = new Discord.RichEmbed()
                .setAuthor("Roast", bot.user.displayAvatarURL)
                .setColor(0xfcf11e)
                .setTitle(`${message.author.username} ${insults[result]}`)
                .setFooter("How does it feel getting roasted by a bot?")
            message.channel.send(embed)
        }
    }
        if (message.content.startsWith(prefix + "eval")) {
        let botmessage = args.join(" ");
        if (message.author.id !== "168865955940794368") return;
        try {
            var code = args.join(" ");
            var evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled)
            var embed = new Discord.RichEmbed()
            message.channel.send({
                embed: {
                    color: 0xfcf11e,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    description: botmessage,
                    fields: [{
                        name: "Result",
                        value: ("x1", clean(evaled))
                    }],
                    timestamp: new Date(),
                }
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
        }

        function clean(text) {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
    }
    if (message.content.startsWith(prefix + "smogon")) {
        const {
        getTimeframes,
        getFormats,
        getUsage,
        getLeads,
        getMovesets 
    } = require("smogon-usage-fetch");
    getMovesets("2018-07", "gen7ou-0",{limit: 3}).then(data => {
        let rand = [
            data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13], data[14], data[15], data[16], data[17], data[18], data[19], data[20], data[21], data[22], data[23], data[24], data[25], data[26], data[27], data[28], data[29], data[30], data[31], data[32], data[33], data[34], data[35], data[36], data[37], data[38], data[39], data[40], data[41], data[42], data[43], data[44], data[45], data[46], data[47], data[48], data[49], data[50], data[51], data[52], data[53], data[54], data[55], data[56], data[57], data[58], data[59], data[60], data[61], data[62], data[63], data[64], data[65], data[66], data[67], data[68], data[69], data[70], data[71], data[72], data[73], data[74], data[75], data[76], data[77], data[78], data[79], data[80], data[81], data[82], data[83], data[84], data[85], data[86], data[87], data[88], data[89], data[90], data[91], data[92], data[93], data[94], data[95], data[96], data[97], data[98], data[99], data[100], data[101], data[102], data[103], data[104], data[105], data[106], data[107], data[108], data[109], data[110], data[111], data[112], data[113], data[114], data[115], data[116], data[117], data[118], data[119], data[120], data[121], data[122], data[123], data[124], data[125], data[126], data[127], data[128], data[129], data[130], data[131], data[132], data[133], data[134], data[135], data[136], data[137], data[138], data[139], data[140], data[141], data[142], data[143], data[144], data[145], data[146], data[147], data[148], data[149], data[150], data[151], data[152], data[153], data[154], data[155], data[156], data[157], data[158], data[159], data[160], data[161], data[162], data[163], data[164], data[165], data[166], data[167], data[168], data[169], data[170], data[171], data[172], data[173], data[174], data[175], data[176], data[177], data[178], data[179], data[180], data[181], data[182], data[183], data[184], data[185], data[186], data[187], data[188], data[189], data[190], data[191], data[192], data[193], data[194], data[195], data[196], data[197], data[198], data[199], data[200], data[201], data[202], data[203], data[204], data[205], data[206], data[207], data[208], data[209], data[210], data[211], data[212], data[213], data[214], data[215], data[216], data[217], data[218], data[219], data[220], data[221], data[222], data[223], data[224], data[225], data[226], data[227], data[228], data[229], data[230], data[231], data[232], data[233], data[234], data[235], data[236], data[237], data[238], data[239], data[240], data[241], data[242], data[243], data[244], data[245], data[246], data[247], data[248], data[249], data[250], data[251], data[252], data[253], data[254], data[255], data[256], data[257], data[258], data[259], data[260], data[261], data[262], data[263], data[264], data[265], data[266], data[267], data[268], data[269], data[270], data[271], data[272], data[273], data[274], data[275], data[276], data[277], data[278], data[279], data[280], data[281], data[282], data[283], data[284], data[285], data[286], data[287], data[288], data[289], data[290], data[291], data[292], data[293], data[294], data[295], data[296], data[297], data[298], data[299], data[300], data[301], data[302], data[303], data[304], data[305], data[306], data[307], data[308], data[309], data[310], data[311], data[312], data[313], data[314], data[315], data[316], data[317], data[318], data[319], data[320], data[321], data[322], data[323], data[324], data[325], data[326], data[327], data[328], data[329], data[330], data[331], data[332], data[333], data[334], data[335], data[336], data[337], data[338], data[339], data[340], data[341], data[342], data[343], data[344], data[345], data[346], data[347], data[348], data[349], data[350], data[351], data[352], data[353], data[354], data[355], data[356], data[357], data[358], data[359], data[360], data[361], data[362], data[363], data[364], data[365], data[366], data[367], data[368], data[369], data[370], data[371], data[372], data[373], data[374], data[375], data[376], data[377], data[378], data[379], data[380], data[381], data[382], data[383], data[384], data[385], data[386], data[387], data[388], data[389], data[390], data[391], data[392], data[393], data[394], data[395], data[396], data[397], data[398], data[399], data[400], 
        ]
        let result = [Math.floor((Math.random() * rand.length))];
        let embed = new Discord.RichEmbed()
        .setTitle(rand[result].pokemon)
        .setColor(0xfba73a)
        .addField(`Viable Abilities for ${rand[result].pokemon}`,(rand[result].abilities[0]+`% Usage \n`+rand[result].abilities[1]+`% Usage`).replace(/,/g, " - "))
        .addField(`Viable Items for ${rand[result].pokemon}`,(rand[result].items[0]+`% Usage \n`+rand[result].items[1]+`% Usage \n`+rand[result].items[2]+`% Usage \n`+rand[result].items[3]+`% Usage \n`).replace(/,/g, " - "))
        .addField(`Viable Moves for ${rand[result].pokemon}`,(rand[result].moves[0]+`% Usage \n`+rand[result].moves[1]+`% Usage \n`+rand[result].moves[2]+`% Usage \n`+rand[result].moves[3]+`% Usage \n`).replace(/,/g, " - "))
        .addField(`Viable Spreads for ${rand[result].pokemon}`,(rand[result].spreads[0]+`% Usage \n`+rand[result].spreads[1]+`% Usage \n`+rand[result].spreads[2]+`% Usage \n`).replace(/,/g, " - ").replace(/:/g, ": "))
        .addField(`Viable Teammates for ${rand[result].pokemon}`,(rand[result].teammates[0]+`% Usage \n`+rand[result].teammates[1]+`% Usage \n`+rand[result].teammates[2]+`% Usage \n`).replace(/,/g, " - "))
        .setThumbnail('https://play.pokemonshowdown.com/sprites/xyani/' + (rand[result].pokemon).toLowerCase() + ".gif")
        .setURL("http://www.smogon.com/dex/sm/pokemon/" + (rand[result].pokemon).toLowerCase())
        .setFooter("If the second ability comes up as \'undefined% Usage\', then that means there is no second ability for that specific Pokémon.")
        message.channel.send(embed);
    }).catch(error => message.reply(`${error}`));
    
}
})
bot.login(process.env.BOT_TOKEN);
