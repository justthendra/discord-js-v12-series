const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
   
   if(args[0] === "yetkili-ayarla") {
        const rol = message.mentions.roles.first()
        if(!rol) return message.reply(`:x: **Sanırım bir rol etiketlemeyi unuttun! Doğru kullanım: \`t!kayıt yetkili-ayarla @rol\`**`)
        db.set(`ThdKayıtYetki${message.guild.id}`, rol.id)
        let rolayarla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıt Yetkilisi Ayarlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıt Yetkilisi Başarıyla ${rol} Olarak Ayarlandı.\nSıfırlamak İstiyorsanız \`t!kayıt yetkili-sıfırla\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(rolayarla) 
    }

    if(args[0] === "yetkili-sıfırla") {
        db.delete(`ThdKayıtYetki${message.guild.id}`, kayıtsızrol.id)
        let kayıtsızayarla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıt Yetkilisi Rolü Sıfırlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıt Yetkilisi Rolü Başarıyla Sıfırlandı.\nAyarlamak İstiyorsanız \`t!kayıt yetkili-ayarla @rol\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(kayıtsızayarla)
    }

    if(args[0] === "kayıtsız-ayarla") {
        const kayıtsızrol = message.mentions.roles.first()
        if(!kayıtsızrol) return message.reply(`:x: **Kayıtsız rolünü etiketlemeyi unuttun! Doğru kullanım: \`t!kayıt kayıtsız-ayarla @rol\`**`)
        db.set(`ThdKayıtsızRol${message.guild.id}`, kayıtsızrol.id)
        let kayıtsızayarla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıtsız Rolü Ayarlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıtsız Rolü Başarıyla ${kayıtsızrol} Olarak Ayarlandı.\nSıfırlamak İstiyorsanız \`t!kayıt kayıtsız-sıfırla\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(kayıtsızayarla) 
    }

    if(args[0] === "kayıtsız-sıfırla") {
        db.delete(`ThdKayıtsızRol${message.guild.id}`, kayıtsızrol.id)
        let kayıtsızsıfırla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıtsız Rolü Sıfırlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıtsız Rolü Başarıyla Sıfırlandı.\nAyarlamak İstiyorsanız \`t!kayıt kayıtsız-ayarla @rol\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(kayıtsızsıfırla)
    }

    if(args[0] === "kayıtlı-ayarla") {
        const kayıtlırol = message.mentions.roles.first()
        if(!kayıtlırol) return message.reply(`:x: **Kayıtlı rolünü etiketlemeyi unuttun! Doğru kullanım: \`t!kayıt kayıtlı-ayarla @rol\`**`)
        db.set(`ThdKayıtlıRol${message.guild.id}`, kayıtlırol.id)
        let kayıtlıayarla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıtlı Rolü Ayarlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıtlı Rolü Başarıyla ${kayıtlırol} Olarak Ayarlandı.\nSıfırlamak İstiyorsanız \`t!kayıt kayıtlı-sıfırla\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(kayıtlıayarla) 
    }

    if(args[0] === "kayıtlı-sıfırla") {
        db.delete(`ThdKayıtlıRol${message.guild.id}`, kayıtlırol.id)
        let kayıtlısıfırla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıtlı Rolü Sıfırlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıtlı Rolü Başarıyla Sıfırlandı.\nAyarlamak İstiyorsanız \`t!kayıt kayıtlı-ayarla @rol\` Yazmanız Yeterlidir Olacaktır.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(kayıtlısıfırla)
    }
   
    // Sistemi Sıfırlama Sonradan Eklendi
   
    if(args[0] === "sıfırla") {
        db.delete(`ThdKayıtlıRol${message.guild.id}`, kayıtlırol.id)
        db.delete(`ThdKayıtsızRol${message.guild.id}`, kayıtsızrol.id)
        db.delete(`ThdKayıtYetki${message.guild.id}`, kayıtsızrol.id)
        db.delete(`ThdKayıtKanal${message.guild.id}`)
        let sıfırla = new Discord.MessageEmbed()
        .setTitle(`<:onay:894244398940954654> Kayıt Sistemi Sıfırlandı`)
        .setDescription(`<:onay:894244398940954654> Kayıt Sistemi Başarıyla Sıfırlandı.\nTekrar Ayarlamak İsterseniz Bütün Argümanları Tekrardan Girmeniz Gerekiyor.`)
        .setColor('GREEN')
        .setFooter(`© 2021 Thendra - Kayıt Sistemi`, client.user.displayAvatarURL())
        message.channel.send(sıfırla)
    }
}

exports.conf = {
    aliases: [],
    permLevel: 2,
    enabled: true,
}

exports.help = {
    name: "kayıt-sistemi",
    description: "kayıt agam",
    usage: "kayıt-sistemi"
}
