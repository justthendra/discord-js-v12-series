const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message) => {

    let channel = message.mentions.channels.first()
    if(!channel) return message.reply(`Kanal Etiketlemeyi Unuttun!`)

    db.set(`ThdUyarıLog_${message.guild.id}`, kanal.id)
    let embed = new Discord.MessageEmbed()
        .setAuthor(`Thendra - Uyarı Sistemi`)
        .addField("Uyarı-Log", `Uyarı-Log Başarıyla ${kanal} Olarak Ayarlandı.`)
        .setColor(`WHITE`)
        .setFooter("© 2021 Thendra", client.user.avatarURL())
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
