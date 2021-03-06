const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const {WebSocket} = require("ws");
const fs = require("fs");
const dotenv = require("dotenv");
(async() => {
    function initSltcv() {
        var socket2 = new WebSocket("wss://sltcv.herokuapp.com");

        socket2.on("close", () => {
            console.log("connection closed")
            setTimeout(initSltcv, 5000);
        });
        socket2.on("open", () => {
            console.log("Websocket started")
        });

        socket2.onmessage = async(msg) => {
     
            var blinfo = JSON.parse(msg.data);
            console.log(blinfo)
            switch(blinfo.message) {
                case "removed blacklist":
                    await fetch("https://discord.com/api/v9/channels/887810878928478239/messages",{headers:{Authorization:"Bot "+process.env.TOKEN,"Content-Type":"application/json"},method:"POST",body:JSON.stringify({content:"Quelqu'un a été unblacklist !",embeds:[{color:5420936,fields:[{name:"Membre",value:`${null==blinfo.blacklisteduser.username?blinfo._id:`\`${blinfo.blacklisteduser.username}#${blinfo.blacklisteduser.discriminator}\` \n (**${blinfo._id}**)`}`},{name:"Reason",value:blinfo.reason}],footer:{text:`Unblacklisted by ${blinfo.blacklistedby}`},author:{name:"NLAR | BLACKLIST MANAGER"},thumbnail:{url:`${null==blinfo.blacklisteduser.avatar?"":`https://cdn.discordapp.com/avatars/${blinfo._id}/${blinfo.blacklisteduser.avatar}?size=128`}`}}]})});
                    break;
                case "new blacklist":
                    const a = await fetch("https://discord.com/api/v9/channels/887810878928478239/messages",{headers:{Authorization:"Bot "+process.env.TOKEN,"Content-Type":"application/json"},method:"POST",body:JSON.stringify({content:"Quelqu'un a été blacklist !",embeds:[{color:13565962,fields:[{name:"Membre",value:`${null==blinfo.blacklisteduser.username?blinfo._id:`\`${blinfo.blacklisteduser.username}#${blinfo.blacklisteduser.discriminator}\` \n (**${blinfo._id}**)`}`},{name:"Reason",value:blinfo.reason}],footer:{text:`Blacklisted by ${blinfo.blacklistedby}`},author:{name:"NLAR | BLACKLIST MANAGER"},thumbnail:{url:`${null==blinfo.blacklisteduser.avatar?"":`https://cdn.discordapp.com/avatars/${blinfo._id}/${blinfo.blacklisteduser.avatar}?size=128`}`}}]})});
                    console.log(await a.text())
                    break;
                case "updated blacklist":
                    await fetch("https://discord.com/api/v9/channels/887810878928478239/messages",{headers:{Authorization:"Bot "+process.env.TOKEN,"Content-Type":"application/json"},method:"POST",body:JSON.stringify({content:"Une blacklist a été mise a jour !",embeds:[{color:5374207,fields:[{name:"Membre",value:`${null==blinfo.blacklisteduser.username?blinfo._id:`\`${blinfo.blacklisteduser.username}#${blinfo.blacklisteduser.discriminator}\` \n (**${blinfo._id}**)`}`},{name:"Reason",value:blinfo.reason},{name:"Old Reason",value:blinfo.reasonold}],footer:{text:`Updated by ${blinfo.blacklistedby}`},author:{name:"NLAR | BLACKLIST MANAGER"},thumbnail:{url:`${null==blinfo.blacklisteduser.avatar?"":`https://cdn.discordapp.com/avatars/${blinfo._id}/${blinfo.blacklisteduser.avatar}?size=128`}`}}]})});
                    break;
            }
        }
      
    }
    initSltcv();
})();


