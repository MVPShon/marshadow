const Discord = require("discord.js");
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
let prefix = ">>";
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
bot.on("message", message => {
let args = message.content.slice(prefix.length).trim().split(" ");
let cmd2 = args.shift().toLowerCase();

if(message.author.bot) return;     
if(!message.content.startsWith(prefix)) return;

try {

    let commandFile = require(`./commands2/${cmd2}.js`);
    commandFile.run(bot, message, args, prefix);

} catch (e) {
    return;
}
})
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
              } else if (msg.author.id == 168865955940794368) { // Commands only to be fired by the bot's owner
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

bot.login(process.env.BOT_TOKEN);
