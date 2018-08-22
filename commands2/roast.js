const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
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
