const Discord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args) => {

    if(args[0] == "ayarla") {
    const kanal = message.mentions.channels.first()
    if(!kanal) return message.reply(`:x: **Yanlış Kullanım! Örnek: a-banlog ayarla #kanal**`)
    db.set(`CwlBanLog_${message.guild.id}`, kanal.id)

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Akhyls - Ban-Log Sistemi`)
    .setDescription(`<:onay:894244398940954654> Ban-Log Kanalı başarıyla ${kanal} olarak ayarlandı!`)
    .setColor('BLACK')
    .setFooter(`© 2021 Akhyls`, client.user.avatarURL())
    .setTimestamp()
    message.channel.send(embed)
    }

    if(args[0] == "sıfırla") {

    db.delete(`CwlBanLog_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Akhyls - Ban-Log Sistemi`)
    .setDescription(`<:onay:894244398940954654> Ban-Log Kanalı başarıyla sıfırlandı!`)
    .setColor('BLACK')
    .setFooter(`© 2021 Akhyls`, client.user.avatarURL())
    .setTimestamp()
    message.channel.send(embed)
    }
}

exports.conf = {
    permLevel: 2,
    aliases: []
}

exports.help = {
    name: "banlog",
    description: "botun pingini gösterir",
    usage: "banlog"
}
