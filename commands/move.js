const footers = require('../data/footers.js'),
    request = require('request'),
    requireFromUrl = require('require-from-url/sync');
let tFooter,
    moves,
    aliases,
    match;

request('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/moves.js', (err, res, body) => {
    if (!err && res.statusCode == 200) {
        moves = requireFromUrl('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/moves.js').BattleMovedex;
    } else {
        console.log('Error fetching Showdown dex; Switching to local dex...');
        moves = require('../data/pokedex.js').BattleMovedex;
    }
});
request('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/aliases.js', (err, res, body) => {
    if (!err && res.statusCode == 200) {
        aliases = requireFromUrl('https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/data/aliases.js').BattleAliases;
    } else {
        console.log('Error fetching Showdown aliases; Switching to local aliases...');
        aliases = require('../data/aliases.js').BattleAliases;
    }
});

module.exports = {
    name: 'move',
    usage: ['move <name>'],
    example: ['move quick attack'],
    shortDesc: 'Shows information about a move',
    longDesc: 'Displays information about a move, such as typing, base power (if any), effects, Smogon viablilty ratings and more.'
};

module.exports.action = (msg, args) => {
    var moveName = args.toLowerCase();
    if (aliases[moveName]) {
        itemName = aliases[moveName];
    }
    var move = moves[moveName];
    if (!move) {
        for (let i = 0; i < Object.keys(moves).length; i++) {
            if (moves[Object.keys(moves)[i]].num == moveName) {
                move = moves[Object.keys(moves)[i]];
                break;
            }
        }
    }
    if (!move) {
        for (let i = 0; i < Object.keys(moves).length; i++) {
            if (moves[Object.keys(moves)[i]].name.toLowerCase() == moveName) {
                move = moves[Object.keys(moves)[i]];
                break;
            }
        }
    }
    if (move) {
        moveName = move.name;
        var descString;
        if (move.desc) {
            descString = move.desc;
        } else {
            descString = move.shortDesc;
        }
        var accuracyString;
        if (move.accuracy === true) {
            accuracyString = "Certain Success";
        } else {
            accuracyString = move.accuracy;
        }
        var viableString;
        if (move.isViable) {
            viableString = "Yes";
        } else {
            viableString = "No";
        }
        var targetString;
        if (move.target == "normal") {
            targetString = "One Enemy";
        } else {
            targetString = capitalizeFirstLetter(move.target.replace(/([A-Z])/g, ' $1'));
        }
        var crystalString;
        if (move.isZ) {
            crystalString = capitalizeFirstLetter(move.isZ.substring(0, move.isZ.length - 1)) + " Z";
        } else {
            crystalString = "None";
        }
        /*tFooter = Math.floor(Math.random() * 15) === 0 ? {
            text: footers[Math.floor(Math.random() * footers.length)],
            icon_url: 'https://cdn.rawgit.com/110Percent/beheeyem/gh-pages/include/favicon.png'
        } : {
            text: "#" + move.num
        };*/
        tFooter = {
            text: 'Support Beheeyem by becoming a patron! https://patreon.com/beheeyem',
            icon_url: 'https://cdn.rawgit.com/110Percent/beheeyem/gh-pages/include/favicon.png'
        };
        var embedObject = {
            title: capitalizeFirstLetter(move.name),
            color: 0xfcf11e,
            fields: [{
                    name: "Description",
                    value: descString
                },
                {
                    name: "Type",
                    value: move.type,
                    inline: true
                },
                {
                    name: "Base Power",
                    value: move.basePower,
                    inline: true
                },
                {
                    name: "PP",
                    value: move.pp,
                    inline: true
                },
                {
                    name: "Category",
                    value: move.category,
                    inline: true
                },
                {
                    name: "Accuracy",
                    value: accuracyString,
                    inline: true
                },
                {
                    name: "Viable?",
                    value: viableString,
                    inline: true
                },
                {
                    name: "Priority",
                    value: move.priority,
                    inline: true
                },
                {
                    name: "Target",
                    value: targetString,
                    inline: true
                },
                {
                    name: "Z-Crystal",
                    value: crystalString,
                    inline: true
                }
            ],
            footer: {
                icon_url: msg.author.avatarURL,
                text: `${msg.author.username}#${msg.author.discriminator}`
            }
        };
        console.log(`Sending move ${move.name} to guild ${msg.guild.name}`);
        msg.channel.send({ embed: embedObject });
    }
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
