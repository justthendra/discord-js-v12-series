// Otorol Sistemi V2

client.on('guildMemberAdd', async member => {
    const channel = db.fetch(`ThdOtorolKanal_${member.guild.id}`)
    const channell = member.guild.channels.cache.get(channel)
    const role = await db.fetch(`ThdOtorol_${member.guild.id}`)
    const rolee = member.guild.roles.cache.get(role)
    member.roles.add(rolee);

    const moment = require('moment')

     let months = {
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

  let finish = member.user.createdAt
      let day = moment(new Date(finish).toISOString()).format('DD')
      let month = moment(new Date(finish).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
     let year =  moment(new Date(finish).toISOString()).format('YYYY')
     let hour = moment(new Date(finish).toISOString()).format('HH:mm')

let daymon = `${day} ${month} ${year} ${hour}`  

      let time = member.user.createdAt
      let day = moment(new Date(time).toISOString()).format('DD')
      let weeks = moment(new Date(time).toISOString()).format('WW')
      let month = moment(new Date(time).toISOString()).format('MM')
      let monthh = moment(new Date(time).toISOString()).format('MM')
      let year =  moment(new Date(time).toISOString()).format('YYYY')
     let yearr = moment(new Date().toISOString()).format('YYYY')

     let netyear = yearr - year

     let created = ` ${netyear} yıl  ${month} ay ${weeks} hafta ${day} gün önce`

     let check;
     if(time < 1296000000) check = 'Tehlikeli! ❌'
     if(time > 1296000000) check = 'Güvenilir! <:onay:894244398940954654>'
    
    let thendra = new Discord.MessageEmbed()
     .setColor('GREEN')
     .setDescription(`<:onay:894244398940954654> **Sunucuya Yeni Katılan** **<@${member.id}>** **İsimli Kullanıcıya** ${rolee} **Rolünü Verdim.**\n\n👋🏻 **Hoşgeldin, <@${member.id}>**!\n\nHesap Güvenilir mi? **${check}**`)
     .setTimestamp()
     .setFooter(`© 2021 v12 series - Otorol Sistemi`, client.user.displayAvatarURL())
     channell.send(thendra)
})
