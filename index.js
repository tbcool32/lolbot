const Discord = require('discord.js');
const Client = new Discord.Client({ disableEveryone: false });
const { prefix } = require('./config');

Client.on('ready', async ready => {

    Client.guilds.forEach(guild => {
        console.log(`Online in: ${guild.name}`);
    })

})

Client.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find(r => r.name.toLowerCase() === 'fans')) 
})

Client.on('message', async message => {
    if (message.mentions.everyone) return;
    if (message.author.bot) return;

    
    if (message.content.toLowerCase().startsWith(prefix + 'kick')) { // if teh user does not type !kick {user} wont run
        let Muser = message.mentions.members.first(); // gets the first tagged user
        if(!Muser) return message.reply('sorry no user given'); // if no user was tagged or they left beofre the tag it stops teh codeand sends that msg
        if(!message.member.hasPermission('KICK_MEMBERS')) return; // sorry im just tierd

        if(!Muser.kickable) return message.reply('sorry you cant kick that user'); // if teh user is not kickable e.g. owner it stop the code from going any futher
        Muser.kick(); // kicks the user
    }

    if (message.content.toLowerCase().startsWith(prefix + 'ban')) {
        let Muser = message.mentions.members.first();
        if(!Muser) return message.reply('sorry no user given');
        if(!message.member.hasPermission('KICK_MEMBERS')) return; // sorry im just tierd

        if(!Muser.bannable) return message.reply('sorry you cant ban that user');
        Muser.ban();
    }

})

Client.login('NTY1OTAyMjY0MjcxODk2NTg2.XLEAqg.VLPjKUShpNU_TysJgYhP9oC_FbI');