const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message) => {

    let user = message.mentions.members.first()  // Uyarısı Silinecek Kişi
    message.guild.members.cache.forEach(user => {
        db.delete(`CwlUyarıKullanıcı_${message.guild.id}_${user.user.id}`)
    })
    

    let embed = new Discord.MessageEmbed()
        .setAuthor(`Curwels - Uyarı Sistemi`)
        .addField("Uyarı Sıfırlandı", `\n**${message.author}** İsimli Yetkili **${user}** İsimli Kullanıcının Uyarılarını Sıfırladı!`)
        .setColor(`WHITE`)
        .setFooter("© 2021 Curwels", client.user.avatarURL())
        .setTimestamp()
        message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: "uyarı-sil",
    description: "",
    usage: ""
};
