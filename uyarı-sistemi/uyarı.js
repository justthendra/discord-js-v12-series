const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let warmlog = await db.fetch(`ThdUyarıLog_${message.guild.id}`)
    if(!warmlog) return message.reply(`Lütfen Bir Uyarı Log Ayarlayın Sistem Çalışmayabilir!`)
    let user = message.mentions.members.first()  // Uyarılacak Kişi
    let reason = args.slice(1).join(' ') // Uyarı Sebebi
    if(!(user||reason)) return message.reply(`Yanlış Kullanım! Örn: \`c!uyarı @Kullanıcı [sebep]\``)

    let warmnum = await db.fetch(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`)
    if(!warmnum) { // Kullanıcı Hiç Uyarılmadıysa
        db.set(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`, 1) // Database'e kaydettik  **${user}** İsimli Kullanıcı ${sebebmoruk} Sebebi İle Uyarıldı!
        let firstWarm = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı", `\n**${user}** İsimli Kullanıcı **${reason}** Sebebi İle Uyarıldı!\n**__Yetkili:__** **${message.author}**`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(firstWarm)
        
        let logFirst = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı-Log", `\n**${message.author}** İsimli Yetkili **${user}** İsimli Kullanıcıyı **${reason}** Sebebi İle Uyardı!`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.guild.channels.cache.get(warmlog).send(logFirst)
    } else { // Kullanıcı Daha Önce Uyarıldıysa
        db.add(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`, 1)
        let secWarm = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı", `\n**${user}** İsimli Kullanıcı **${reason}** Sebebi İle Uyarıldı!\nBu Kullanıcının Toplamda **${warmnum}** Uyarısı Var!\n**__Yetkili:__** **${message.author}**`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(secWarm)

        let logSec = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı-Log", `\n**${message.author}** İsimli Yetkili **${user}** İsimli Kullanıcıyı **${reason}** Sebebi İle Uyardı!\nBu Kullanıcının Toplamda **${warmnum}** Uyarısı Var!`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.guild.channels.cache.get(warmlog).send(logSec)
    }
    if(warmnum >= 3) {
        user.kick(reason)
        let lastWarm = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı", `\n**${user}** İsimli Kullanıcı 3 Uyarısı Olduğu İçin Sunucudan Atıldı.\n**__Yetkili:__** **${message.author}**`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(lastWarm)
        db.delete(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['warm'],
    permLevel: 2
}

exports.help = {
    name: "uyarı",
    description: "Uyarı",
    usage: "uyarı"
}
