const discord = require("discord.js");
const db = require("quick.db")


exports.run = async(client, message, args) => {

    if(message.guild == null) return
    let channelID = args[0]


    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const notAuthority = new discord.MessageEmbed()
        .setAuthor("❌ Yetersiz Yetki!")
        .setDescription("**Bu Komudu Kullanman İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
        .setColor("RED")
      return message.channel.send(yetkinyokmeh)
    }


    if (!channelID) {
      const notID = new discord.MessageEmbed()
        .setAuthor("❌ Eksik Argüman!")
        .setDescription("**Toplantı Kanalını Ayarlamak İçin O Kanalın ID'sini Belirtmelisiniz!**")
        .setColor("RED")
      return message.channel.send(idyokmeh)
    }



    if(isNaN(channelID)) {
      const nan = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setDescription("**Kanal ID'si Sadece Rakamlardan Oluşabilir!**")
      .setColor("RED")
      return message.channel.send(nan)
    }

    const channelfetch = client.channels.cache.get(channelID)
    if(typeof(channelfetch) == "undefined") {
      const not = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setColor("RED")
      .setDescription("**Böyle Bir Kanal ID'si Bulunamadı**")
      return message.channel.send(not)
    }
    if(channelfetch.guild.id !== message.guild.id) {
      const notonserver = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setDescription("**Belirttiğiniz Kanal ID'si Bulunamadı Bu Kanala Erişimim Olmayabilir Veya Bu Kanal Bu Sunucuda Yok**")
      .setColor("RED")
      return message.channel.send(notonserver)
    }
    if(channelfetch.type !== "voice") {
      const notvoice = new discord.MessageEmbed()
      .setAuthor("❌ Yanlış Argüman!")
      .setColor("RED")
      .setDescription("**Belirttiğiniz Kanal Sesli Bir Kanal Olmalıdır!**")
      return message.channel.send(notvoice)
    }
    db.set(`guildtoplantichannel_${message.guild.id}`, channelID)

    const guiltEmb = new discord.MessageEmbed()
    .setAuthor("✅ Başarılı!")
    .setDescription("**Toplantı Kanalı Belirttiğiniz Kanal ID'si Olarak Ayarlandı!**")
    .setColor("GREEN")
    return message.channel.send(guiltEmb)


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
