const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    const sunucu = message.guild.id;
    if (db.has(`ThdBanLog_${message.guild.id}`) === false) return message.reply(`Ban-Log Kanalı Ayarlanmamış. Örnek: \`a-banlog ayarla <#kanal>\``);
    const kanal = db.get(`ThdBanLog_${message.guild.id}`)
    const banlog = message.guild.channels.cache.get(kanal)
    const kisi = message.mentions.members.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]); 
    if (!kisi) message.reply(`:x: **Yanlış kullanım! Yasağını kaldıracağım kişiyi etiketlemen gerek.**`)
    const orospu = client.users.cache.get(kisi.id)
    var sebeb = args.slice(1).join(' ') ? args.slice(1).join(' ') : "Sebep Belirtilmemiş"


    message.channel.send(`${kisi} İsimli Kullanıcının Yasağı Kaldırıldı!`)

    const banembed = new Discord.MessageEmbed()
    .setTitle(`İşlem - Kullanıcının Yasağını Kaldırma`)
    .setThumbnail(orospu.displayAvatarURL({ dynamic: true }))
    .setDescription(`**${kisi}** İsimli kullanıcının yasağı kaldırıldı.\n**Yetkili:** ${message.author}`)
    .setColor(`GREEN`)
    .setFooter(`© 2021 Akhyls`, client.user.avatarURL())
    .setTimestamp()
    banlog.send(banembed)
    message.guild.members.unban(kisi, sebeb)
}

exports.conf = {
    aliases: [],
    permLevel: 2,
    enabled: true,
};

exports.help = {
    name: "unban",
    description: "etiketlenen kişiyi sunucudan yasaklar",
    usage: "unban @kullanıcı <sebep>"
}