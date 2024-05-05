const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("ms");

exports.run = async (client, message, args) => {    
if (db.has(`ThdMuteLog_${message.guild.id}`) === false) return message.reply(`Mute-Log Kanalı Ayarlanmamış. Örnek: \`t-mutelog ayarla <#kanal>\``);
const channel = db.get(`ThdMuteLog_${message.guild.id}`)
const mutelog = message.guild.channels.cache.get(channel)

var muterole1 = db.fetch(`ThdMuteRol_${message.guild.id}`);
var muterole2 = message.guild.roles.cache.find(r => r.id === muterole1);
if (!muterole2) {
    try {
   
     muterole2 = await message.guild.roles.create({ 
            data: {
                name: "Susturuldu",
                color: "#1800FF",
                permissions: []
              },
            reason: 'Mute Rolü!' 
            })

        db.set(`ThdMuteRol_${message.guild.id}`, muterole2.id);

        message.guild.channels.cache.forEach(async (channel) => {
            await channel.createOverwrite(muterole2, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false
              });
          });

} catch (err) {
    console.log(err);
}

};

var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!user) return message.reply("Susturmasını Açmam İçin Bir Kullanıcı Belirtiniz!");
const member = client.users.cache.get(user.id)

 if(!user.roles.cache.find(r => r.id === muterole2.id)) return message.reply("Kişi Daha Önceden Susturulmamış!")

 
var reason = args.slice(1).join(" ")

if(reason){ // Sebep Belirtildiyse
    await user.roles.remove(muterole2.id);
    message.channel.send(`**${user}** Susturulması Açıldı!\n**Yetkili:** ${message.author}`);
    const unmuteembed = new Discord.MessageEmbed()
    .setTitle(`İşlem - Kullanıcı Susturulması Kaldırma`)
    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
    .setDescription(`**${user}** Susturulması Açıldı!\n**Yetkili:** ${message.author}\n **Sebep:** ${reason}`)
    .setColor(`GREEN`)
    .setFooter(`© 2021 Thendra`, client.user.avatarURL())
    .setTimestamp()
    mutelog.send(unmuteembed)
} else { // Sebep belirtilmediyse
    await user.roles.remove(muterole2.id);
    message.channel.send(`**${user}** Susturulması Açıldı!\n**Yetkili:** ${message.author}`);
    const unmuteembed2 = new Discord.MessageEmbed()
    .setTitle(`İşlem - Kullanıcı Susturulması Kaldırma`)
    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
    .setDescription(`**${user}** Susturulması Açıldı!\n**Yetkili:** ${message.author}`)
    .setColor(`GREEN`)
    .setFooter(`© 2021 Thendra`, client.user.avatarURL())
    .setTimestamp()
    mutelog.send(unmuteembed2)
};


};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unmute',
  description: 'Sunucudaki Bir Kişiyi Susturmasını Kaldırır.',
  usage: 'unmute {@kullanici} {sebep}'
};
