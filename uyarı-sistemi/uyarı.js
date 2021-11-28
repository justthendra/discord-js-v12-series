const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let uarılog = await db.fetch(`ThdUyarıLog_${message.guild.id}`)
    if(!uarılog) return message.reply(`Lütfen Bir Uyarı Log Ayarlayın Sistem Çalışmayabilir!`)
    let user = message.mentions.members.first()  // Uyarılacak Kişi
    let sebebmoruk = args.slice(1).join(' ') // Uyarı Sebebi
    if(!(user||sebebmoruk)) return message.reply(`Yanlış Kullanım! Örn: \`t!uyarı @Kullanıcı [sebep]\``)

    let uyarısayı = await db.fetch(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`)
    if(!uyarısayı) { // Kullanıcı Hiç Uyarılmadıysa
        db.set(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`, 1) // Database'e kaydettik  **${user}** İsimli Kullanıcı ${sebebmoruk} Sebebi İle Uyarıldı!
        let ilkuyarı = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı", `\n**${user}** İsimli Kullanıcı **${sebebmoruk}** Sebebi İle Uyarıldı!\n**__Yetkili:__** **${message.author}**`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(ilkuyarı)
        
        let logilk = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı-Log", `\n**${message.author}** İsimli Yetkili **${user}** İsimli Kullanıcıyı **${sebebmoruk}** Sebebi İle Uyardı!`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.guild.channels.cache.get(uarılog).send(logilk)
    } else { // Kullanıcı Daha Önce Uyarıldıysa
        db.add(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`, 1)
        let ikiuyarı = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı", `\n**${user}** İsimli Kullanıcı **${sebebmoruk}** Sebebi İle Uyarıldı!\nBu Kullanıcının Toplamda **${uyarısayı}** Uyarısı Var!\n**__Yetkili:__** **${message.author}**`)
        .setFooter("© 2020 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(ikiuyarı)

        let logiki = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı-Log", `\n**${message.author}** İsimli Yetkili **${user}** İsimli Kullanıcıyı **${sebebmoruk}** Sebebi İle Uyardı!\nBu Kullanıcının Toplamda **${uyarısayı}** Uyarısı Var!`)
        .setFooter("© 2020 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.guild.channels.cache.get(uarılog).send(logiki)
    }
    if(uyarısayı >= 3) {
        user.kick(sebebmoruk)
        let sonuyarı = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .setColor(`WHITE`)
        .addField("Uyarı", `\n**${user}** İsimli Kullanıcı 3 Uyarısı Olduğu İçin Sunucudan Atıldı.\n**__Yetkili:__** **${message.author}**`)
        .setFooter("© 2020 Thendra", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(sonuyarı)
        db.delete(`ThdUyarıKullanıcı_${message.guild.id}_${user.id}`)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "uyarı",
    description: "Uyarı",
    usage: "uyarı"
}