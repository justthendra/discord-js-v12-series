const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("ms");

exports.run = async (client, message, args) => {    
const sunucu = message.guild.id;
if (db.has(`ThdMuteLog_${message.guild.id}`) === false) return message.reply(`Mute-Log Kanalı Ayarlanmamış. Örnek: \`a-mutelog ayarla <#kanal>\``);
const kanal = db.get(`ThdMuteLog_${message.guild.id}`)
const mutelog = message.guild.channels.cache.get(kanal)


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

var kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!kisi) return message.reply("Susturmam İçin Bir Kullanıcı Belirtiniz!");
const adam = client.users.cache.get(kisi.id)

var time = args[1];
var reason = args.slice(2).join(" ")

if (!time) {
    if(reason){
        await kisi.roles.add(muterole2.id);
        message.channel.send(`**${kisi}** İsimli Kullanıcı **${reason}** Nedeniyle **SINIRSIZ** Şekilde Susturuldu!`);
        const muteembed = new Discord.MessageEmbed()
        .setTitle(`İşlem - Kullanıcı Susturuldu`)
        .setThumbnail(adam.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${kisi}** İsimli Kullanıcı **${reason}** Nedeniyle **SINIRSIZ** Şekilde Susturuldu!\n**Yetkili:** ${message.author}`)
        .setColor(`RED`)
        .setFooter(`© 2021 Thendra`, client.user.avatarURL())
        .setTimestamp()
        mutelog.send(muteembed)
    } else { // Sebep belirtilmediyse
        await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **SINIRSIZ** Şekilde Susturuldu!\n**Yetkili:** ${message.author}`);
        const muteembed2 = new Discord.MessageEmbed()
        .setTitle(`İşlem - Kullanıcı Susturuldu`)
        .setThumbnail(adam.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${kisi}** İsimli Kullanıcı **SINIRSIZ** Şekilde Susturuldu!\n**Yetkili:** ${message.author}`)
        .setColor(`RED`)
        .setFooter(`© 2021 Thendra`, client.user.avatarURL())
        .setTimestamp()
        mutelog.send(muteembed2)
    };

} else {
    
    if(reason){ // Hem zaman hem de sebep belirtildiyse
        await kisi.roles.add(muterole2.id);
        message.channel.send(`**${kisi}** İsimli Kullanıcı **${reason}** Nedeniyle **${time}** Süresince Şekilde Susturuldu!`);
        const muteembed3 = new Discord.MessageEmbed()
        .setTitle(`İşlem - Kullanıcı Susturuldu`)
        .setThumbnail(adam.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${kisi}** İsimli Kullanıcı **${reason}** Nedeniyle **${time}** Süresince Şekilde Susturuldu!\n**Yetkili:** ${message.author}`)
        .setColor(`RED`)
        .setFooter(`© 2021 Thendra`, client.user.avatarURL())
        .setTimestamp()
        mutelog.send(muteembed3)
       
       
           setTimeout(function() { // Mute süresi bitti
            if(kisi.roles.cache.find(r => r.id === muterole2.id)){
              kisi.roles.remove(muterole2.id)
              const unmuteembed = new Discord.MessageEmbed()
              .setTitle(`İşlem - Kullanıcı Susturulması Kaldırma`)
              .setThumbnail(adam.displayAvatarURL({ dynamic: true }))
              .setDescription(`**${kisi}** İsimli Kullanıcının Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`)
              .setColor(`GREEN`)
              .setFooter(`© 2021 Thendra`, client.user.avatarURL())
              .setTimestamp()
              mutelog.send(unmuteembed)
            }
           }, ms(time));

    } else { // Sebep belirtilmemiş - Süre belirtilmiş
        await kisi.roles.add(muterole2.id);
        message.channel.send(`**${kisi}** İsimli Kullanıcı **${time}** Süreyle Susturuldu!`);
        const muteembed4 = new Discord.MessageEmbed()
        .setTitle(`İşlem - Kullanıcı Susturuldu`)
        .setThumbnail(adam.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${kisi}** İsimli Kullanıcı **${time}** Süreyle Susturuldu!\n**Yetkili:** ${message.author}`)
        .setColor(`RED`)
        .setFooter(`© 2021 Thendra`, client.user.avatarURL())
        .setTimestamp()
        mutelog.send(muteembed4)

        setTimeout(function() { // Süre Bittiğinde
            if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                kisi.roles.remove(muterole2.id)
              const unmuteembed2 = new Discord.MessageEmbed()
              .setTitle(`İşlem - Kullanıcı Susturulması Kaldırma`)
              .setThumbnail(adam.displayAvatarURL({ dynamic: true }))
              .setDescription(`**${kisi}** İsimli Kullanıcının Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`)
              .setColor(`GREEN`)
              .setFooter(`© 2021 Thendra`, client.user.avatarURL())
              .setTimestamp()
              mutelog.send(unmuteembed2)
            }
           }, ms(time));
    }
};
};

exports.conf = {
  aliases: ['sustur',],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Sunucudaki Bir Kişiyi Susuturur.',
  usage: 'mute {@kullanici} {zaman} {sebep}'
};
