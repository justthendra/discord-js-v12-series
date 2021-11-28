const discord = require("discord.js");
const db = require("quick.db")


exports.run = async(client, message, args) => {

 if (message.guild == null) return
    const islem = args[0]


    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const yetkinyokmeh = new discord.MessageEmbed()
        .setAuthor("❌ Yetersiz Yetki!")
        .setDescription("**Bu Komudu Kullanman İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
        .setColor("RED")
      return message.channel.send(yetkinyokmeh)
    }



    if (!islem) {
      const islemyok = new discord.MessageEmbed()
        .setAuthor("❌ Argüman Eksik!")
        .setDescription("**Bir İşlem Belirtmelisiniz!**")
        .setColor("RED")
      return message.channel.send(islemyok)
    }
    var islemlerarr = ["yardım", "başlat", "say", "çağır", "bitir"]
    if (!islemlerarr.includes(islem.toLowerCase())) {
      const yanlisislem = new discord.MessageEmbed()
        .setAuthor("❌ Yanlış Argüman!")
        .setDescription("**İşlemler Şunlar Olabilir; **" + "`" + "yardım, başlat, say, çağır, bitir" + "`")
        .setColor("RED")
      return message.channel.send(yanlisislem)
    }

    if (islem.toLowerCase() == "başlat") {
      const kanalget = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (kanalget == null) {
        const kanalyok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(kanalyok)
      }

      const stafflar = db.fetch(`guildstaff_${message.guild.id}`)
      if (stafflar == null) {
        const embedstafflaryok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(embedstafflaryok)
      }
      const rolget = db.fetch(`toplantirol_${message.guild.id}`)
      const rolfetch = message.guild.roles.cache.get(rolget)
      const kanalfetch = client.channels.cache.get(kanalget)
      try {
        await kanalfetch.createOverwrite(rolfetch, {
          VIEW_CHANNEL: true
        })


        const sucembed = new discord.MessageEmbed()
          .setAuthor("✅ Başarılı!")
          .setDescription("**Belirtilen Kanal Belirttiğiniz Yetkili Rolü İçin Açıldı**")
          .setColor("GREEN")
        message.channel.send(sucembed)
        db.set(`toplantidurum_${message.guild.id}`, "basladi")
      } catch (e) {
        const yetkimyok = new discord.MessageEmbed()
          .setAuthor("❌ Yetkim Yetersiz!")
          .setDescription("**Toplantı Rolünün Belirttiğiniz Kanal Üzerindeki Yetkilerini Değiştirmek İçin Yetkim Yetersiz!**")
          .setColor("RED")
        return message.channel.send(yetkimyok)
      }

    } else if(islem.toLowerCase() == "say") {
      var sucstring = ""
      const durumfetch = db.fetch(`toplantidurum_${message.guild.id}`)
      if(durumfetch == null) {
        const baslatmamış = new discord.MessageEmbed()
        .setAuthor("❌ Önce Toplantıyı Başlatmalısın!")
        .setColor("RED")
        .setDescription("**Sesli Kanaldaki Üyelerin Aktifliğini Kontrol Etmek İçin Önce Toplantıyı Başlatmalısınız!**")
        return message.channel.send(baslatmamış)
      }
      const kanalget = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (kanalget == null) {
        const kanalyok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(kanalyok)
      }

      const stafflar = db.fetch(`guildstaff_${message.guild.id}`)
      if (stafflar == null) {
        const embedstafflaryok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(embedstafflaryok)
      }

      const kanalfetch = client.channels.cache.get(kanalget)
      const members = kanalfetch.members



      var stafflarobj = []
      stafflar.forEach(staff => {
       stafflarobj.push(message.guild.members.cache.get(staff.userID))
      })
      stafflarobj.forEach(member => {
        var aktiflik = null
        if(member.voice.channel) {
          if(member.voice.channel.id == kanalget) {
            aktiflik = "Toplantıda"
          }
        } else {
          aktiflik = "Toplantıda Değil"
        }
        sucstring +=  "**" + member.user.tag +  " | "  + member.user.presence.status + " | " + aktiflik +"**"+ "\n"
      })
      const sucembed = new discord.MessageEmbed()
      .setAuthor("Toplantı İçinde Olması Gereken Yetkililerin Durumları")
      .setDescription(sucstring)
      .setColor("GREEN")
    message.channel.send(sucembed)
    } else if(islem.toLowerCase() == "bitir") {
      const kanalget = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (kanalget == null) {
        const kanalyok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(kanalyok)
      }

      const stafflar = db.fetch(`guildstaff_${message.guild.id}`)
      if (stafflar == null) {
        const embedstafflaryok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(embedstafflaryok)
      }
      const rolget = db.fetch(`toplantirol_${message.guild.id}`)
      const rolfetch = message.guild.roles.cache.get(rolget)
      const kanalfetch = client.channels.cache.get(kanalget)
      try {
        await kanalfetch.createOverwrite(rolfetch, {
          VIEW_CHANNEL: false
        })


        const sucembed = new discord.MessageEmbed()
          .setAuthor("✅ Başarılı!")
          .setDescription("**Belirtilen Kanal Belirttiğiniz Yetkili Rolü İçin Kapandı**")
          .setColor("GREEN")
        message.channel.send(sucembed)
        db.delete(`toplantidurum_${message.guild.id}`)
      } catch (e) {
        const yetkimyok = new discord.MessageEmbed()
          .setAuthor("❌ Yetkim Yetersiz!")
          .setDescription("**Toplantı Rolünün Belirttiğiniz Kanal Üzerindeki Yetkilerini Değiştirmek İçin Yetkim Yetersiz!**")
          .setColor("RED")
        return message.channel.send(yetkimyok)
      }
    } else if(islem.toLowerCase() == "çağır") {
      var sucstring = ""
      const durumfetch = db.fetch(`toplantidurum_${message.guild.id}`)
      if(durumfetch == null) {
        const baslatmamış = new discord.MessageEmbed()
        .setAuthor("❌ Önce Toplantıyı Başlatmalısın!")
        .setColor("RED")
        .setDescription("**Kanalda Olmayan Kişileri Çağırmadan Önce Toplantıyı Başlatmalısınız!**")
        return message.channel.send(baslatmamış)
      }
      const kanalget = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (kanalget == null) {
        const kanalyok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(kanalyok)
      }

      const stafflar = db.fetch(`guildstaff_${message.guild.id}`)
      if (stafflar == null) {
        const embedstafflaryok = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(embedstafflaryok)
      }

      const kanalfetch = client.channels.cache.get(kanalget)
      const members = kanalfetch.members



      var stafflarobj = []
      stafflar.forEach(staff => {
       stafflarobj.push(message.guild.members.cache.get(staff.userID))
      })
      stafflarobj.forEach(member => {
        if(member.voice.channel) {
          if(member.voice.channel.id == kanalget) {
           // aktiflik = "Toplantıda"
          }
        } else {
          try{
            const toplantıyagel = new discord.MessageEmbed()
            .setAuthor(message.guild.name + " Adlı Sunucudan Çağırılıyorsunuz")
            .setDescription("**Toplantı Başladı Katılımınız Bekleniyor**")
            .setColor("GREEN")
            member.send(toplantıyagel)
          } catch(e) {

          }
         
        }
      })
      const sucembed = new discord.MessageEmbed()
      .setAuthor("✅ Başarılı!")
      .setDescription("**Gelmeyen Katılımcılar Çağırıldı**")
      .setColor("GREEN")
      message.channel.send(sucembed)
    }   

};

exports.conf = {
    aliases: ['toplantı'],
    permLevel: 0,
    kategori: "Diğer",
};

exports.help = {
    name: 'toplantı',
    description: 'toplantı işte',
    usage: 'toplantı <işlem>',

};