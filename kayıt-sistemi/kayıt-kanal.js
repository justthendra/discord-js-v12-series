const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    const kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send("❌ Bir kanal etiketlemeyi unuttun! Doğru kullanım: `t!kayıt-kanal #kanal`")

    db.set(`ThdKayıtKanal${message.guild.id}`, kanal.id)
    let kanalayarla = new Discord.MessageEmbed()
    .setTitle(`<:onay:894244398940954654> Kayıt Kanalı Ayarlandı`)
    .setDescription(`<:onay:894244398940954654> Kayıt Kanalı Başarıyla ${kanal} Olarak Ayarlandı.\nSıfırlamak İstiyorsanız \`t!kayıt-kanal sıfırla\` Yazmanız Yeterlidir Olacaktır.`)
    .setColor('GREEN')
    .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
    message.channel.send(kanalayarla)

    if(args[0] === "sıfırla") {
        db.delete(`ThdKayıtKanal${message.guild.id}`)
        let kanalayarla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıt Kanalı Sıfırlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıt Kanalı Başarıyla Sıfırlandı.\nAyarlamak İstiyorsanız \`t!kayıt-kanal #kanal\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(kanalayarla)
    }
}

exports.conf = {
    aliases: [],
    permLevel: 2,
    enabled: true,
}

exports.help = {
    name: "kayıt-kanal",
    description: "kayıt agam",
    usage: "kayıt-kanal"
}