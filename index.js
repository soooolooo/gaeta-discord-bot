const Discord = require('discord.js');
const {Client, Attachment} = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bot = new Client();
const token = "REDACTED";
const PREFIX = '';
const version = '2.4.1';
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

var gaetaChannel;
var botSpam;



var apilink = 'http://api.etf2l.org/';
var player = 'player/';
var id = '14782';
var jsonlast = '.json';

var url = apilink + player + id +jsonlast;

function loadJSON(path, success, message)
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var apiData = JSON.parse(xhr.responseText);
            success(apiData, message);
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function setFields (etf2l, message) {
    let playerEmbed = new Discord.RichEmbed()
    .setTitle('ETF2L Player Information')
    .setColor('DARK_GOLD')
    .addField('Name:', etf2l.player.name, true)
    .addField('SteamID:', etf2l.player.steam.id3, true)
    .addField('Country:', etf2l.player.country, true)
    .setThumbnail(etf2l.player.steam.avatar);
    var teams = "\n";
    var classes = "\n";
    if (etf2l.player.classes !== null){
        etf2l.player.classes.forEach(function(tf2class) {
            classes += tf2class + '\n';
        });
        playerEmbed.addField('Classes:', classes, true);
    }

    if (etf2l.player.classes == null){
        playerEmbed.addField('Classes:', 'None');
    }

    if (etf2l.player.teams !== null){
        etf2l.player.teams.forEach(function(team) {
            teams += team.name + ' [' + team.type + ']\n';
        });
        playerEmbed.addField('Current teams joined:', teams);
    }

    if (etf2l.player.teams == null) {
        playerEmbed.addField('Current teams joined:', 'None');
    }



    message.channel.send(playerEmbed);
}
bot.on('message', message => {

    const gaetaGeneral = bot.channels.cache.get('609089068076105742');
    const gaetaSpam = bot.channels.cache.get('827342434081046528');
    gaetaChannel = gaetaGeneral;
    botSpam = gaetaSpam;
    
    
    // organizing the messages for the bot.
    let userMessage = message.content.substring(PREFIX.length).split(" ");


    var etf2lid = '';

    const lolarray = [
        'https://media.mstdn.io/mstdn-media/media_attachments/files/000/888/032/small/a7038b9452babbe9.png',
        'https://i.kym-cdn.com/photos/images/newsfeed/001/293/670/b7d.jpg',
        'https://i.kym-cdn.com/photos/images/newsfeed/001/156/965/04f.png'
    ];

    const bruharray = [
        'https://i.redd.it/zvtc1ojzwnwx.jpg',
        'https://memeshappen.com/media/created/BRUH--meme-33134.jpg',
        'https://scathubhome.files.wordpress.com/2019/05/cropped-bruh-1.jpg'
    ];

    const cringearray = [
        'https://cdn.discordapp.com/attachments/609163339985059887/621932449429061642/4d5.png',
        'https://i.kym-cdn.com/photos/images/original/001/491/516/01e.png',
        'https://pbs.twimg.com/ext_tw_video_thumb/1126507475170017286/pu/img/LXcfi9Sa4W6-2M9j.jpg'
    ];

    if (userMessage[0] === 'gaeta'){
      switch (userMessage[1]){
        case 'player':
            if (userMessage[2] === undefined) {
                    message.channel.send("Please provide ID too");
            }
            else {
                switch (userMessage[2]){
                    case 'solo':
                        etf2lid = '96541';
                        break;

                    case 'mattj':
                        etf2lid = '124830';
                        break;

                    case 'mankind':
                        etf2lid = '116058';
                        break;

                    case 'hondjo':
                        etf2lid = '118746';
                        break;

                    case 'poy':
                        etf2lid = '112629';
                        break;
                    
                    case 'improbable':
                        etf2lid = '115996';
                        break;

                    case 'canlock':
                        etf2lid = '118791';
                        break;
                    
                    case 'tbourdon':
                        etf2lid = '114717';
                        break;
                    
                    case 'yak':
                        etf2lid = '71145';
                        break;
                    
                    default:
                        etf2lid = userMessage[2];
                        break;
                }
                
                url = 'http://api.etf2l.org/player/' + etf2lid + '.json'
                loadJSON(url, setFields, message);
            }
        break;

        case 'info':
            const infoEmbed = new Discord.RichEmbed()
            .setTitle('Gaeta eSports official bot')
            .setColor(0xFF0000)
            .addField('Version: ' , version)
            .addField('Update note:', '1- Organized players information embed to be smaller')
            .addField('Teams added:', 'None')
            .addField('Players added:', 'None')
            .addField('Made by: ', 'solo')
            .addField('BIG Thanks to:', 'NeuTronas')
            .setThumbnail(bot.user.displayAvatarURL);
            message.channel.sendEmbed(infoEmbed);
            break;

        case 'bruh':
            var bruhimage = new Attachment(bruharray[Math.floor(Math.random()*bruharray.length)]);
            message.channel.bulkDelete(1);
            message.channel.send(bruhimage);
            message.channel.send(message.member.displayName + ' used bruh');
            break;

        case 'killfurry':
            var killfurryimage = new Attachment('https://cdn.discordapp.com/attachments/254922480739811328/602139438205763584/stonethefurfag.gif');
            message.channel.bulkDelete(1);
            message.channel.send(killfurryimage);
            message.channel.send(message.member.displayName + ' used killfurry');
            break;

        case 'lol':
            var lolimage = new Attachment(lolarray[Math.floor(Math.random()*lolarray.length)]);
            message.channel.bulkDelete(1);
            message.channel.send(lolimage);
            message.channel.send(message.member.displayName + ' used lol');
            break;

        case 'saysike':
            var saysikeimage = new Attachment('https://cdn.discordapp.com/attachments/306012781688127488/610164027401830478/plant.jpg');
            message.channel.bulkDelete(1);
            message.channel.send(saysikeimage);
            message.channel.send(message.member.displayName + ' used saysike');
            break;

        case 'cringe':
        //    var grusayingnoimage = new Attachment('https://cdn.discordapp.com/attachments/609089068076105742/610158153018900493/65026853_2116999865259949_4238412183347904692_n.jpg');
            var cringeimage = new Attachment(cringearray[Math.floor(Math.random()*cringearray.length)]);
            message.channel.bulkDelete(1);
            message.channel.send(cringeimage);
            message.channel.send(message.member.displayName + ' used cringe');
            break;

        //case 'pootis':
        //    var pootisimage = new Attachment('https://i.imgur.com/n2yMw5z.gif');
        //    message.reply('Congratulations!, You\'ve found the secret! : D');
        //    message.channel.sendMessage(pootisimage);
        //    break;

        case 'silence':
            var silenceimage = new Attachment('https://cdn.discordapp.com/attachments/341165302014279683/610438490341113876/b5b.png');
            message.channel.bulkDelete(1);
            message.channel.send(silenceimage);
            message.channel.send(message.member.displayName + ' used silence');
            break;

        case 'hlinfo':
            message.channel.send('https://docs.google.com/spreadsheets/d/1qtLyeWKzSPFm-j7QEyPH-cYOdxrQukodj2CvpmtfW4Y/edit#gid=0');
            message.channel.send('Big shoutout to supra for this doc!');
            break;

        case 'help':
            message.channel.send('Commands list:\n1- team (team name) "not available"\n2- player (player name)\n3- info\n4- bruh\n5- killfurry\n6- lol\n7- saysike\n8- silence\n9- hlinfo');
            break;

        case 'start':
            readline.question('', msgg => {
                gaetaChannel.send(msgg);
                botSpam.send('gaeta start');
            });
        break;
            
            

        // Music commands

        case 'play':
            break;

        case 'stop':
            break;

        case 'skip':
            break;

        // End of music commands

        default:
            message.channel.sendMessage('Unknown command, please type (gaeta help) to check commands list.');
            break;
          
      }
    }
});

bot.on('message', message => {
    if (message.channel != botSpam){
        console.log(message.member.displayName + '@' + message.channel + ': ' + message.content);
    }
    
});

bot.once('ready', () => {
    console.log('Bot is activated.')

    
    //Setting an activity for the bot to be seen "Watching you"
    bot.user.setActivity('you', {type: 'WATCHING'}).catch(console.error);
})

//Logging in by using the token above
bot.login(token);