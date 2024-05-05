const discord = require("discord.js");
const db = require("quick.db")


exports.run = async(client, message, args) => {

 if (message.guild == null) return
    const process = args[0]


    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const notAuthority = new discord.MessageEmbed()
        .setAuthor("❌ Yetersiz Yetki!")
        .setDescription("**Bu Komudu Kullanman İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
        .setColor("RED")
      return message.channel.send(notAuthority)
    }



    if (!process) {
      const notProces = new discord.MessageEmbed()
        .setAuthor("❌ Argüman Eksik!")
        .setDescription("**Bir İşlem Belirtmelisiniz!**")
        .setColor("RED")
      return message.channel.send(notProcess)
    }
    var processArg = ["yardım", "başlat", "say", "çağır", "bitir"]
    if (!processArg.includes(process.toLowerCase())) {
      const wrongProc = new discord.MessageEmbed()
        .setAuthor("❌ Yanlış Argüman!")
        .setDescription("**İşlemler Şunlar Olabilir; **" + "`" + "yardım, başlat, say, çağır, bitir" + "`")
        .setColor("RED")
      return message.channel.send(wrongProc)
    }

    if (process.toLowerCase() == "başlat") {
      const channel = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (channel == null) {
        const notChannel = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(notChannel)
      }

      const staffs = db.fetch(`guildstaff_${message.guild.id}`)
      if (staffs == null) {
        const notStaffs = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(notStaffs)
      }
      const roleget = db.fetch(`toplantirol_${message.guild.id}`)
      const rolefetch = message.guild.roles.cache.get(roleget)
      const channelfetch = client.channels.cache.get(channel)
      try {
        await channelfetch.createOverwrite(rolefetch, {
          VIEW_CHANNEL: true
        })


        const guiltEmb = new discord.MessageEmbed()
          .setAuthor("✅ Başarılı!")
          .setDescription("**Belirtilen Kanal Belirttiğiniz Yetkili Rolü İçin Açıldı**")
          .setColor("GREEN")
        message.channel.send(guiltEmb)
        db.set(`toplantidurum_${message.guild.id}`, "basladi")
      } catch (e) {
        const notAuthor = new discord.MessageEmbed()
          .setAuthor("❌ Yetkim Yetersiz!")
          .setDescription("**Toplantı Rolünün Belirttiğiniz Kanal Üzerindeki Yetkilerini Değiştirmek İçin Yetkim Yetersiz!**")
          .setColor("RED")
        return message.channel.send(notAuthor)
      }

    } else if(process.toLowerCase() == "say") {
      var guiltstring = ""
      const statusfetch = db.fetch(`toplantidurum_${message.guild.id}`)
      if(statusfetch == null) {
        const notStarted = new discord.MessageEmbed()
        .setAuthor("❌ Önce Toplantıyı Başlatmalısın!")
        .setColor("RED")
        .setDescription("**Sesli Kanaldaki Üyelerin Aktifliğini Kontrol Etmek İçin Önce Toplantıyı Başlatmalısınız!**")
        return message.channel.send(notStarted)
      }
      const channelget = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (channelget == null) {
        const notChannel = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(notChannel)
      }

      const staffs = db.fetch(`guildstaff_${message.guild.id}`)
      if (staffs == null) {
        const notStaffs = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(notStaffs)
      }

      const channelfetch = client.channels.cache.get(channelget)
      const members = channelfetch.members



      var staffsobj = []
      staffs.forEach(staff => {
       staffsobj.push(message.guild.members.cache.get(staff.userID))
      })
      staffsobj.forEach(member => {
        var activty = null
        if(member.voice.channel) {
          if(member.voice.channel.id == channelget) {
            activity = "Toplantıda"
          }
        } else {
          activty = "Toplantıda Değil"
        }
        guiltstring +=  "**" + member.user.tag +  " | "  + member.user.presence.status + " | " + activity +"**"+ "\n"
      })
      const guiltEmb = new discord.MessageEmbed()
      .setAuthor("Toplantı İçinde Olması Gereken Yetkililerin Durumları")
      .setDescription(guiltstring)
      .setColor("GREEN")
    message.channel.send(guiltEmb)
    } else if(process.toLowerCase() == "bitir") {
      const channelget = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (channelget == null) {
        const notChannel = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(notChannel)
      }

      const staffs = db.fetch(`guildstaff_${message.guild.id}`)
      if (staffs == null) {
        const notStaffs = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(notStaffs)
      }
      const roleget = db.fetch(`toplantirol_${message.guild.id}`)
      const rolefetch = message.guild.roles.cache.get(roleget)
      const channelfetch = client.channels.cache.get(channelget)
      try {
        await channelfetch.createOverwrite(rolefetch, {
          VIEW_CHANNEL: false
        })


        const guiltEmb = new discord.MessageEmbed()
          .setAuthor("✅ Başarılı!")
          .setDescription("**Belirtilen Kanal Belirttiğiniz Yetkili Rolü İçin Kapandı**")
          .setColor("GREEN")
        message.channel.send(guiltEmb)
        db.delete(`toplantidurum_${message.guild.id}`)
      } catch (e) {
        const notAuthor = new discord.MessageEmbed()
          .setAuthor("❌ Yetkim Yetersiz!")
          .setDescription("**Toplantı Rolünün Belirttiğiniz Kanal Üzerindeki Yetkilerini Değiştirmek İçin Yetkim Yetersiz!**")
          .setColor("RED")
        return message.channel.send(notAuthor)
      }
    } else if(process.toLowerCase() == "çağır") {
      var guiltstring = ""
      const statusfetch = db.fetch(`toplantidurum_${message.guild.id}`)
      if(statusfetch == null) {
        const notStarted = new discord.MessageEmbed()
        .setAuthor("❌ Önce Toplantıyı Başlatmalısın!")
        .setColor("RED")
        .setDescription("**Kanalda Olmayan Kişileri Çağırmadan Önce Toplantıyı Başlatmalısınız!**")
        return message.channel.send(notStarted)
      }
      const channelget = db.fetch(`guildtoplantichannel_${message.guild.id}`)
      if (channelget == null) {
        const notChannel = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Kanalı Belirtilmemiş!")
          .setColor("RED")
          .setDescription("**Toplantıyı Başlatmak İçin Toplantı Kanalı Belirtilmelidir!**")
        return message.channel.send(notChannel)
      }

      const staffs = db.fetch(`guildstaff_${message.guild.id}`)
      if (staffs == null) {
        const notStaffs = new discord.MessageEmbed()
          .setAuthor("❌ Toplantı Rolü Belirtilmemiş!")
          .setDescription("**Bu Komudu Kullanmadan Önce Sunucu İçindeki Yetkilileri Belirlemelisiniz!**")
          .setColor("RED")
        return message.channel.send(notStaffs)
      }

      const channelfetch = client.channels.cache.get(kanalget)
      const members = kanalfetch.members



      var staffsobj = []
      staffs.forEach(staff => {
       staffsobj.push(message.guild.members.cache.get(staff.userID))
      })
      staffsobj.forEach(member => {
        if(member.voice.channel) {
          if(member.voice.channel.id == channelget) {
          }
        } else {
          try{
            const comeMeet = new discord.MessageEmbed()
            .setAuthor(message.guild.name + " Adlı Sunucudan Çağırılıyorsunuz")
            .setDescription("**Toplantı Başladı Katılımınız Bekleniyor**")
            .setColor("GREEN")
            member.send(comeMeet)
          } catch(e) {

          }
         
        }
      })
      const guiltemb = new discord.MessageEmbed()
      .setAuthor("✅ Başarılı!")
      .setDescription("**Gelmeyen Katılımcılar Çağırıldı**")
      .setColor("GREEN")
      message.channel.send(guiltemb)
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
