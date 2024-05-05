const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {

    if(args[0] === "rol-ayarla") {
        const role = message.mentions.roles.first()
        if(!role) return message.reply(`:x: **Bir rol etiketlemeyi unuttun! Doğru kullanım: \`a-otorol rol-ayarla @rol\`**`)
        db.set(`ThdOtorol_${message.guild.id}`, role.id)
        let setRole = new Discord.MessageEmbed()
        .setTitle(`Akhyls - Otorol Sistemi`)
        .setDescription(`<:onay:894244398940954654> Otorol Rolü Başarıyla ${role} Olarak Ayarlandı.\nSıfırlamak İstiyorsanız \`a-otorol rol-sıfırla\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('BLACK')
        .setFooter(`© 2021 Akhyls - Otorol Sistemi`, client.user.displayAvatarURL())
        message.channel.send(setRole) 

    }

    if(args[0] === "rol-sıfırla") {
        db.delete(`ThdOtorol_${message.guild.id}`)
        let resRole = new Discord.MessageEmbed()
        .setTitle(`Akhyls - Otorol Sistemi`)
        .setDescription(`<:onay:894244398940954654> Otorol Rolü Başarıyla Sıfırlandı.\nTekrardan Ayarlamak İstiyorsanız \`a-otorol rol-ayarla @rol-ismi\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('BLACK')
        .setFooter(`© 2021 Akhyls - Otorol Sistemi`, client.user.displayAvatarURL())
        message.channel.send(resRole)
    }

    if(args[0] === "kanal-ayarla") {
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply(`:x: **Kanal etiketlemeyi unuttun! Doğru kullanım: \`a-otorol kanal-ayarla #kanal\`**`)
        db.set(`ThdOtorolKanal_${message.guild.id}`, channel.id)
        let channelEmb = new Discord.MessageEmbed()
        .setTitle(`Akhyls - Otorol Kanal Sistemi`)
        .setDescription(`<:onay:894244398940954654> Otorol Kanalı Başarıyla ${channel} Olarak Ayarlandı.\nSıfırlamak İstiyorsanız \`a-otorol kanal-sıfırla\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('BLACK')
        .setFooter(`© 2021 Akhyls - Otorol Sistemi`, client.user.displayAvatarURL())
        message.channel.send(channelEmb)
    }

    if(args[0] === "kanal-sıfırla") {
        db.delete(`ThdOtorolKanal_${message.guild.id}`)
        let resChannel = new Discord.MessageEmbed()
        .setTitle(`Akhyls - Otorol Kanal Sistemi`)
        .setDescription(`<:onay:894244398940954654> Otorol Kanalı Başarıyla Sıfırlandı.\nTekrardan Ayarlamak İstiyorsanız \`a-otorol kanal-ayarla #kanal-ismi\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('BLACK')
        .setFooter(`© 2021 Akhyls - Otorol Sistemi`, client.user.displayAvatarURL())
        message.channel.send(resChannel)
    }

    if(args[0] === "sıfırla") {
        db.delete(`ThdOtorolKanal_${message.guild.id}`)
        db.delete(`ThdOtorol_${message.guild.id}`)
        let reset = new Discord.MessageEmbed()
        .setTitle(`Akhyls - Otorol Kanal Sistemi`)
        .setDescription(`<:onay:894244398940954654> Otorol Sistemi Başarıyla Sıfırlandı.\nTekrardan Ayarlamak İstiyorsanız \`a-otorol rol-ayarla @rol-ismi\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('BLACK')
        .setFooter(`© 2021 Akhyls - Otorol Sistemi`, client.user.displayAvatarURL())
        message.channel.send(reset)
    }

    if (args[0] == 'yardım') {
    let help = new Discord.MessageEmbed()
    .setTitle(`Akhyls - Otorol Yardım`)
    .addField('**Otorol Yardım**',' Otorol Komutları Aşağıda Bulunmaktadır.')
    .addField('`a-otorol rol-ayarla`', `Otorol'de verilecek rolü ayarlarsınız.`)
    .addField('`a-otorol rol-sıfırla`', `Otorol'de ayarladığınız rolü sıfırlar.`)
    .addField('`a-otorol kanal-ayarla`', `Otorol'da mesajın gönderiliceği kanalı ayarlarsınız.`)
    .addField('`a-otorol kanal-sıfırla`', `Otorol'da belirlediğiniz kanalı sıfırlar.`)
    .addField('`a-otorol sıfırla`', `Otorol sistemini sıfırlar.`)
	.setFooter(`© 2021 Akhyls - Otorol Sistemi`, client.user.displayAvatarURL())
	.setColor('BLACK')
	message.channel.send(help)
  }

}

exports.conf = {
    aliases: [],
    permLevel: 2,
    enabled: true,
};

exports.help = {
    name: "otorol",
    description: "otorolu ayarlar",
    usage: "otorol"
}
