const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message) => {

    let kanal = message.mentions.channels.first()
    if(!kanal) return message.reply(`Kanal Etiketlemeyi Unuttun!`)

    db.set(`CwlUyarıLog_${message.guild.id}`, kanal.id)
    let embed = new Discord.MessageEmbed()
        .setAuthor(`Curwels - Uyarı Sistemi`)
        .addField("Uyarı-Log", `Uyarı-Log Başarıyla ${kanal} Olarak Ayarlandı.`)
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
    name: "uyarılog",
    description: "",
    usage: ""
};
