const Discord = require('discord.js');
const db = require('quick.db');
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

exports.run = async (client, message, args) => {
    const sunucu = message.guild.id;
    if (db.has(`ThdBanLog_${message.guild.id}`) === false) return message.reply(`Ban-Log Kanalı Ayarlanmamış. Örnek: \`a-banlog ayarla <#kanal>\``);
    const kanal = db.get(`ThdBanLog_${message.guild.id}`)
    const banlog = message.guild.channels.cache.get(kanal)
    const kisi = message.mentions.members.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]); 
    if (!kisi) message.reply(`:x: **Yanlış kullanım! Yasaklayacağım kişiyi etiketlemen gerek.**`)
    const banlanıcak = client.users.cache.get(kisi.id)
    var sebeb = args.slice(1).join(' ') ? args.slice(1).join(' ') : "Sebep Belirtilmemiş"

    if(!message.author.id !== message.guild.ownerID) {  
    if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) <= 1) {
    const rolsira = new Discord.MessageEmbed()
    .setDescription("**❌ Bu Kişi Rol Sıralamasında Senden Yüksekte Veya Eşit Bu Sebeple Onu Banlayamazsın!**")
    .setColor("RED")
    return message.channel.send(rolsira) 
     }
    }


    if(kisi.id == message.guild.ownerID) {
    const arkadaşownermış = new Discord.MessageEmbed()
    .setDescription("**❌ Bu Kişi Sunucu Sahibi Onu Banlayamazsın!**")
    .setColor("RED")
    return message.channel.send(arkadaşownermış) 
    }

    message.channel.send(`${kisi} İsimli Kullanıcı Sunucudan Yasaklandı!`)

    const banembed = new Discord.MessageEmbed()
    .setTitle(`İşlem - Kullanıcı Yasaklama`)
    .setThumbnail(banlanıcak.displayAvatarURL({ dynamic: true }))
    .setDescription(`**Kullanıcı:** ${kisi}\n**Sebep:** ${sebeb}\n**Yetkili:** ${message.author}`)
    .setColor(`RED`)
    .setFooter(`© 2021 Akhyls`, client.user.avatarURL())
    .setTimestamp()
    banlog.send(banembed)

    const sucembeddm = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} İsimli Sunucudan Yasaklandın!`)
    .setDescription(`**Sebep:** ${sebeb}\n**Yetkili:** ${message.author}`)
    .setColor("RED")
    .setFooter(`© 2021 Akhyls`, client.user.avatarURL())
    .setTimestamp()
    orospu.send(sucembeddm).then(banmemb => {
        message.guild.members.ban(kisi, { reason: sebeb });
    });
}

exports.conf = {
    aliases: [],
    permLevel: 2,
    enabled: true,
};

exports.help = {
    name: "ban",
    description: "etiketlenen kişiyi sunucudan yasaklar",
    usage: "ban @kullanıcı <sebep>"
}
