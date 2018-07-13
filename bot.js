const Discord = require("discord.js");
oakdexPokedex = require('oakdex-pokedex');
let bot = new Discord.Client();
let prefix = "u!"; //put your prefix between the "" eg Sylveons prefix is ?

bot.on("ready", () => {
console.log("Ready!")
bot.user.setActivity('with deez nuts.')
});

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
    

if(message.content.startsWith(prefix + "servers")) {
                var list = bot.guilds.array().sort();
                    bot.users.get("168865955940794368").send("I am on `" + bot.guilds.size + "` servers.");
                    bot.users.get("168865955940794368").send("These servers are: " + list);
}
    

        if(message.content.includes("hungry") || message.content.includes(" eating ") || message.content.includes("food") || message.content.includes("Food") || message.content.includes("Hungry") || message.content.includes(" eat ") || message.content.includes(" eat.")){
            let food = [
                "https://media-cdn.tripadvisor.com/media/photo-s/0b/b3/58/52/mouth-watering-food.jpg",
                "https://image.shutterstock.com/image-photo/close-mouth-watering-flavored-fried-260nw-258246467.jpg",
                "https://goodfood.hr/wp-content/uploads/2016/09/chicken-ciabatta.jpg",
                "https://i0.wp.com/secretnyc.co/wp-content/uploads/2016/06/cheesesteak.jpg?resize=666%2C388&ssl=1",
                "https://www.phxsoul.com/wp-content/uploads/2014/06/bbqribs.jpg",
                "https://usercontent1.hubstatic.com/7572860.jpg",
                "https://res.cloudinary.com/paleoleap/image/upload/f_auto,q_70/v1519811569/j-paleo/chorizo-spinach-omelette-main.jpg",
                "https://lifeloveandgoodfood.com/wp-content/uploads/2016/04/Bruschetta-Waffle-Panini-1-1024x706.jpg",
                "https://lifeloveandgoodfood.com/wp-content/uploads/2014/03/Cheesy-Chicken-Enchiladas_8801-400x600.jpg",
                "https://foodchannelcom.files.wordpress.com/2017/08/richmond-buffalo-chicken-waffle-fries.jpg?w=1000&h=600&crop=1",
                "http://www.sgfoodie.com/wp-content/uploads/2016/07/Truly-Test-Kitchen-Curry-Chicken-Chop-Noodle.jpg",
                "http://blogs.kcrw.com/goodfood/wp-content/uploads/2014/03/220SmashedSteakSkewerswCherryBarbecueSauceS-1-e1396028805889.jpg",
                "https://cdn.discordapp.com/attachments/466436909607157772/467211741952999425/a407f65.jpg",
                "https://amp.businessinsider.com/images/551992b56da8115001dd9d1e-750-562.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-s/0a/4e/04/46/best-food-ever.jpg"
                        ]
            let randfood = Math.floor((Math.random() * food.length))
            let embed = new Discord.RichEmbed()
            .setAuthor("Food", bot.user.displayAvatarURL)
            .setColor("RANDOM")
            .setTitle(`Food for ${message.author.username}`)
            .setImage(`${food[randfood]}`)
            message.channel.send(embed)
            }
    if(message.content.startsWith(prefix + "stfu")) {
        setTimeout(function(){},10000);
        message.delete();
        message.channel.send("Seriously, just shut the fuck up! <:stfu:461992028453208064>") }
        if(message.content.startsWith(prefix + "copy")) {
            let repeat = args.join(" ")
            message.delete();
            message.channel.send(repeat) } 
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
                message.channel.send("I am a bot created by MVPShon for many various uses. My prefix is `u!` Currently, there aren't many things I can do but I keep growing and expanding each day. For the moment, type `u!commands` to see what I can currently do."); }
            if (message.content.startsWith(prefix + "commands")) {
                message.author.send("My current commands are: \n`roast` - Insult your friends with my ever-growing list of roasts and insults\n`copy` - Straight forward command. I copy whatever you tell me to. This command works better if I can delete other people's messages.\n`pokedex` or `dex` - Brings up a Pokemon's stats. Putting the Pokemon's name in lowercase will also show a picture!");
        }
            if (message.content.startsWith(prefix + "invite")) {
                message.channel.send("If you'd ike to invite me to your server then please click the following link: https://discordapp.com/oauth2/authorize?client_id=463451155842727938&scope=bot&permissions=21469585912");
        }
            if(message.content.startsWith(prefix + "roast")) {
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
        if(args[0]) {
            let embed = new Discord.RichEmbed()
            .setAuthor("Roast", bot.user.displayAvatarURL)
            .setColor("RANDOM")
            .setTitle(`${targetUser.user.username} ${insults[result]}`)
            .setFooter("How does it feel getting roasted by a bot?")
            message.channel.send(embed)
        }
    
        if(!args[0]) {
            let embed = new Discord.RichEmbed()
            .setAuthor("Roast", bot.user.displayAvatarURL)
            .setColor("RANDOM")
            .setTitle(`${message.author.username} ${insults[result]}`)
            .setFooter("How does it feel getting roasted by a bot?")
            message.channel.send(embed)
        }            
        }
        if(message.content.startsWith(prefix + "dex") || (message.content.startsWith(prefix + "pokedex")) {
            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }
            oakdexPokedex.findPokemon(`${args[0].capitalize()}`, function(p) {
               let name = p.names.en; //done
                let types = p.types; //done
                let base_stats = p.base_stats; //done
                let catchrate = p.catch_rate;            
    
                let embed = new Discord.RichEmbed()
                .setAuthor("Pokédex", bot.user.displayAvatarURL)
                .setColor("RANDOM")
                .addField("Name:", name, true)
                .addField("Types:", types, true)
                .addField("Pokemon Catch Rate", catchrate, true)
                .addField("HP:", base_stats.hp, true)
                .addField("ATK:", base_stats.atk, true)
                .addField("DEF:", base_stats.def, true)
                .addField("SP ATK:", base_stats.sp_atk, true)
                .addField("SP DEF:", base_stats.sp_def, true)
                .addField("SPEED:", base_stats.speed, true)
                .setImage(`https://play.pokemonshowdown.com/sprites/xyani/${args[0]}.gif`, true)
                message.channel.send(embed)
              });
        }
    });
  bot.login(process.env.BOT_TOKEN); //Between the "" put your bot token
