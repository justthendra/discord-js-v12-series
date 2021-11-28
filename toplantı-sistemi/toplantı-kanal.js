const discord = require("discord.js");
const db = require("quick.db")


exports.run = async(client, message, args) => {

    if(message.guild == null) return
    let kanalid = args[0]


    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const yetkinyokmeh = new discord.MessageEmbed()
        .setAuthor("❌ Yetersiz Yetki!")
        .setDescription("**Bu Komudu Kullanman İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
        .setColor("RED")
      return message.channel.send(yetkinyokmeh)
    }


    if (!kanalid) {
      const idyokmeh = new discord.MessageEmbed()
        .setAuthor("❌ Eksik Argüman!")
        .setDescription("**Toplantı Kanalını Ayarlamak İçin O Kanalın ID'sini Belirtmelisiniz!**")
        .setColor("RED")
      return message.channel.send(idyokmeh)
    }



    if(isNaN(kanalid)) {
      const nan = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setDescription("**Kanal ID'si Sadece Rakamlardan Oluşabilir!**")
      .setColor("RED")
      return message.channel.send(nan)
    }

    const channelfetch = client.channels.cache.get(kanalid)
    if(typeof(channelfetch) == "undefined") {
      const yok = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setColor("RED")
      .setDescription("**Böyle Bir Kanal ID'si Bulunamadı**")
      return message.channel.send(yok)
    }
    if(channelfetch.guild.id !== message.guild.id) {
      const busunucudadeil = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setDescription("**Belirttiğiniz Kanal ID'si Bulunamadı Bu Kanala Erişimim Olmayabilir Veya Bu Kanal Bu Sunucuda Yok**")
      .setColor("RED")
      return message.channel.send(busunucudadeil)
    }
    if(channelfetch.type !== "voice") {
      const seslideil = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setColor("RED")
      .setDescription("**Belirttiğiniz Kanal Sesli Bir Kanal Olmalıdır!**")
      return message.channel.send(seslideil)
    }
    db.set(`guildtoplantichannel_${message.guild.id}`, kanalid)

    const sucembed = new discord.MessageEmbed()
    .setAuthor("✅ Başarılı!")
    .setDescription("**Toplantı Kanalı Belirttiğiniz Kanal ID'si Olarak Ayarlandı!**")
    .setColor("GREEN")
    return message.channel.send(sucembed)


};

exports.conf = {
    aliases: ['channel-set'],
    permLevel: 0,
    kategori: "Diğer",
};

exports.help = {
    name: 'toplantı-kanal',
    description: 'channel-set işte',
    usage: 'channel-set <Kanal ID>',

};