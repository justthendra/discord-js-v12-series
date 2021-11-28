// Otorol Sistemi V2

client.on('guildMemberAdd', async member => {
    const kanal = db.fetch(`ThdOtorolKanal_${member.guild.id}`)
    const kanal2 = member.guild.channels.cache.get(kanal)
    const rol = await db.fetch(`ThdOtorol_${member.guild.id}`)
    const rol2 = member.guild.roles.cache.get(rol)
    member.roles.add(rol2);

    const moment = require('moment')

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
      let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık").replace("13","CodAre")//codare
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
    
    let thendras = new Discord.MessageEmbed()
     .setColor('GREEN')
     .setDescription(`<:onay:894244398940954654> **Sunucuya Yeni Katılan** **<@${member.id}>** **İsimli Kullanıcıya** ${rol2} **Rolünü Verdim.**\n\n👋🏻 **Hoşgeldin, <@${member.id}>**!\n\nHesap Güvenilir mi? **${kontrol}**`)
     .setTimestamp()
     .setFooter(`© 2021 Akhyls - Otorol Sistemi`, client.user.displayAvatarURL())
     kanal2.send(thendras)
})
