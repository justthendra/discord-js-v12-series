client.on('guildMemberAdd', member => {

    const moment = require('moment')

     let kanal = db.fetch(`ThdKayıtKanal${member.guild.id}`)
     if(!kanal) return;

       let aylar = {
               "01": "Ocak",
               "02": "Şubat",
               "03": "Mart",
               "04": "Nisan",
               "05": "Mayıs",
               "06": "Haziran",
               "07": "Temmuz",
               "08": "Ağustos",
               "09": "Eylül",
               "10": "Ekim",
               "11": "Kasım",
               "12": "Aralık"
    }

  let bitiş = member.user.createdAt
      let günü = moment(new Date(bitiş).toISOString()).format('DD')
      let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
     let yılı =  moment(new Date(bitiş).toISOString()).format('YYYY')
     let saati = moment(new Date(bitiş).toISOString()).format('HH:mm')

let günay = `${günü} ${ayı} ${yılı} ${saati}`  

      let süre = member.user.createdAt
      let gün = moment(new Date(süre).toISOString()).format('DD')
      let hafta = moment(new Date(süre).toISOString()).format('WW')
      let ay = moment(new Date(süre).toISOString()).format('MM')
      let ayy = moment(new Date(süre).toISOString()).format('MM')
      let yıl =  moment(new Date(süre).toISOString()).format('YYYY')
     let yıl2 = moment(new Date().toISOString()).format('YYYY')

     let netyıl = yıl2 - yıl

     let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`

     let kontrol;
     if(süre < 1296000000) kontrol = 'Tehlikeli! ❌'
     if(süre > 1296000000) kontrol = 'Güvenilir! <:onay:894244398940954654>'

     const kayıtyetkili = db.fetch(`ThdKayıtYetki${member.guild.id}`)
     const yetkili = member.guild.roles.cache.get(kayıtyetkili)
     const kayıtsızrol = db.fetch(`ThdKayıtsızRol${member.guild.id}`)
     const kayıtsızroles = member.guild.roles.cache.get(kayıtsızrol)
     const guild = client.guilds.cache.get(member.guild.id)

     member.roles.add(kayıtsızroles)

     let curwels = new Discord.MessageEmbed()
     .setColor('GREEN')
     .setDescription(`👋🏻 Hoşgeldin, <@${member.id}>!\n<:onay:894244398940954654> **Kaydının Yapılması için bir Kayıt Yetkilisini Ya da Yetkiliyi Etiketle.**\n\n🧾 **Bu Sunucuya Katıldığından İtibaren Kuralları Kabul Etmiş Sayılacaksın, Bu Yüzden Kurallar Kanalına Bakmayı Unutma!**\n\n**${yetkili}**\n\nHesap Güvenilir mi? **${kontrol}**`)
     //.setDescription('<@'+member.id+'> Bilgileri : \n\n  Hesap oluşturulma tarihi **[' + created + ']** (`' + günay + '`) \n\n Hesap Durumu : **' + kontrol + '**') // Curwels Ab
     .setTimestamp()
     client.channels.cache.get(kanal).send(curwels)
})
