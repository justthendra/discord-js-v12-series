const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed().setAuthor("❌ Yetersiz Yetki!").setDescription("**Bu Komutu Kullanabilmek İçin `Rolleri Yönet` Yetkisine Sahip Olmalısın!**").setColor("RED"))

    const kullanıcı = message.mentions.members.first()
    const member = message.guild.member(kullanıcı)
    const kanal = db.fetch(`ThdKayıtKanal${message.guild.id}`)

    const kanals = message.guild.channels.cache.get(kanal)

    const kayıtlırol = db.fetch(`ThdKayıtlıRol${message.guild.id}`)
    const kayıtsızrol = db.fetch(`ThdKayıtsızRol${message.guild.id}`)

    if(!kullanıcı) return message.channel.send("❌ Bir Kullanıcıyı Etiketlemeyi Unuttun!")
    member.roles.add(kayıtlırol)
    member.roles.remove(kayıtsızrol)
    const kayıtbaşarılı = new Discord.MessageEmbed()
    .setAuthor("ThendraDevs - Kayıt Sistemi")
    .setDescription(`<:onay:894244398940954654> ${member} İsimli Kullanıcı Başarıyla Kayıt Edildi. Sunucuya Hoşgeldin ${member}`)
    .setColor("GREEN")
    .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
    .setTimestamp()
    kanals.send(kayıtbaşarılı)
    
}

exports.conf = {
    aliases: [],
    permLevel: 2,
    enabled: true,
}

exports.help = {
    name: "kayıt",
    description: "kayıt agam",
    usage: "kayıt"
}