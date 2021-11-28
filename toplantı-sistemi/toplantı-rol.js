const discord = require("discord.js");
const db = require("quick.db")


exports.run = async(client, message, args) => {

 
 if(message.guild == null) return
    let rolemention = message.mentions.roles.first()


    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const yetkinyokmeh = new discord.MessageEmbed()
        .setAuthor("❌ Yetersiz Yetki!")
        .setDescription("**Bu Komudu Kullanman İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
        .setColor("RED")
      return message.channel.send(yetkinyokmeh)
    }


    if (!rolemention) {
      const mentionyokmeh = new discord.MessageEmbed()
        .setAuthor("❌ Eksik Argüman!")
        .setDescription("**Toplantı Rolünü Seçmek İçin Bir Rolü Etiketlemelisiniz!**")
        .setColor("RED")
      return message.channel.send(mentionyokmeh)
    }
    const rolid = rolemention.id
    const sahip = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == rolid))
    if (sahip.length == 0) {
      const kimseyokmeh = new discord.MessageEmbed()
        .setAuthor("❌ Yanlış Argüman!")
        .setDescription("**Bu Role Sahip Hiçbir Üye Bu Sunucuda Yok!**")
        .setColor("RED")
      return message.channel.send(kimseyokmeh)
    }

    sahip.forEach(member => {
      db.push(`guildstaff_${message.guild.id}`, member)
    });
    db.set(`toplantirol_${message.guild.id}`, rolid)
    const sucembed = new discord.MessageEmbed()
    .setAuthor("✅ Başarılı!")
    .setDescription("**Belirttiğiniz Role Sahip Kişiler Artık Yetkili Olarak Seçildi!**")
    .setColor("GREEN")
    return message.channel.send(sucembed)




};

exports.conf = {
    aliases: ['staff-set'],
    permLevel: 0,
    kategori: "Diğer",
};

exports.help = {
    name: 'toplantı-rol',
    description: 'staff-set işte',
    usage: 'staff-set <Rol Etiketi>',

};